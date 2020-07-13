import { auth, database } from "../../config/config";
import moment from "moment";
import * as firebase from "firebase";
require("firebase/functions");

const writeUserData = ({
  uid = null,
  values,
  isProfessional,
  patientUid,
  registerPatient = false,
}) => {
  if (registerPatient) {
    database.ref("professionals/" + uid + "/patients/" + patientUid).set({
      firstName: values.firstName || "",
      lastName: values.lastName || "",
      surName: values.surName || "",
      givenName: values.givenName || "",
      phone: values.tel_number
        ? values.tel_country_code + values.tel_number
        : "",
      uid: patientUid,
      inactive: true,
    });
    database.ref("users/" + patientUid).set({
      uid: patientUid,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      birthday: moment(values.birthday).toJSON(),
      job: values.job,
      history: values.history,
      disease: values.disease,
      inactive: true,
    });
    if (!values.parentSelectionDisalbed && values.parent.uid) {
      database
        .ref("users/" + values.parent.uid + "/familyMembers/" + patientUid)
        .set({
          firstName: values.firstName,
          lastName: values.lastName,
          inactive: true,
          uid: patientUid,
        });
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
  registerPatient,
  returnOnComplete,
}) => {
  let createPatientAccount = firebase
    .functions()
    .httpsCallable("createPatientAccount");
  createPatientAccount({
    email: values.email,
  })
    .then((response) => {
      writeUserData({
        uid: auth.currentUser.uid,
        values,
        patientUid: response.data.uid,
        registerPatient,
      });
      returnOnComplete();
    })
    .catch((error) => console.error(error));
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
        navigation.navigate("Tutorial");
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
        navigation.navigate("Tutorial");
        writeUserData({ uid, values, navigation, isProfessional });
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  }
};
