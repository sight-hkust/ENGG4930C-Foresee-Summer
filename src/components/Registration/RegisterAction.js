import { auth, database } from "../../config/config";
import moment from "moment";
import * as Random from "expo-random";
import { nanoid } from "nanoid/async/index.native";

const writeUserData = ({
  uid = null,
  values,
  isProfessional,
  patientUUID,
  registerPatient = false,
}) => {
  if (registerPatient) {
    database.ref("professionals/" + uid + "/patients/" + patientUUID).set({
      firstName: values.firstName || "",
      lastName: values.lastName || "",
      surName: values.surName || "",
      givenName: values.givenName || "",
      phone: values.tel_country_code + values.tel_number,
      uid: patientUUID,
    });
    database.ref("userInfo/" + patientUUID).set({
      uid: patientUUID,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      birthday: moment(values.birthday).toJSON(),
      job: values.job,
      history: values.history,
      disease: values.disease,
    });
    if (!values.parentSelectionDisalbed && values.parent.uid) {
      database
        .ref("userInfo/" + values.parent.uid + "/familyMembers/" + patientUUID)
        .set(true);
    }
  } else {
    if (!isProfessional) {
      database.ref("/users/" + uid).set({
        uid: uid,
        email: values.email,
        phone: values.tel_country_code + values.tel_number,
        firstName: values.firstName,
        lastName: values.lastName,
        birthday: moment(values.birthday).toJSON(),
        records: {},
      });
      database.ref("userInfo/" + uid).set({
        uid: uid,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.tel_country_code + values.tel_number,
        birthday: moment(values.birthday).toJSON(),
        allowedSearch: values.allowedSearch,
      });
    } else {
      database.ref("/professionals/" + uid).set({
        uid: uid,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.tel_country_code + values.tel_number,
        role: values.role,
      });
    }
  }
};

export const registerPatientAccount = async ({
  values,
  isProfessional,
  registerPatient,
  onComplete,
}) => {
  const uid = auth.currentUser.uid;
  const patientUUID = await nanoid();
  writeUserData({
    uid,
    values,
    patientUUID,
    isProfessional,
    registerPatient,
  });
  onComplete();
};

export const createAccount = ({
  values,
  navigation,
  isProfessional,
  registerPatient,
}) => {
  if (isProfessional) {
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(function (userCreds) {
        const uid = userCreds.user.uid;
        if (userCreds) {
          userCreds.user.updateProfile({ displayName: "professional" });
        }
        navigation.navigate("Profile");
        writeUserData({ uid, values, navigation, isProfessional });
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  } else {
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(function (userCreds) {
        const uid = userCreds.user.uid;
        if (userCreds) {
          userCreds.user.updateProfile({ displayName: "user" });
        }
        navigation.navigate("Profile");
        writeUserData({ uid, values, navigation, isProfessional });
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  }
};
