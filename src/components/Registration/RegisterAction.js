import { auth, database } from "../../config/config";
import moment from "moment";
import * as firebase from "firebase";
import { nanoid } from "nanoid/async/index.native";
require("firebase/functions");

const writeUserData = ({
  uid = null,
  values,
  isProfessional,
  registerPatient = false,
  patientUid = null,
  registerChild = false,
  childUid = null,
}) => {
  console.log(registerChild);
  switch (true) {
    case registerPatient:
      database.ref("professionals/" + uid + "/patients/" + patientUid).set({
        uid: patientUid,
        inactive: true,
        firstName: values.firstName || "",
        lastName: values.lastName || "",
        surName: values.surName || "",
        givenName: values.givenName || "",
      });
      database.ref("users/" + patientUid).set({
        uid: patientUid,
        inactive: true,
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
          .ref("users/" + values.parent.uid + "/familyMembers/" + patientUid)
          .set({
            uid: patientUid,
            inactive: true,
            firstName: values.firstName,
            lastName: values.lastName,
          });
      }
      break;
    case registerChild:
      database.ref("users/" + uid + "/familyMembers/" + childUid).set({
        uid: childUid,
        inactive: true,
        firstName: values.firstName || "",
        lastName: values.lastName || "",
        surName: values.surName || "",
        givenName: values.givenName || "",
      });
      database.ref("users/" + childUid).set({
        uid: childUid,
        inactive: true,
        firstName: values.firstName || "",
        lastName: values.lastName || "",
        surName: values.surName || "",
        givenName: values.givenName || "",
        birthday: moment(values.birthday).toJSON(),
        job: values.job,
        history: values.history,
        disease: values.disease,
        allowedSearch: values.allowedSearch,
      });
      break;
    default:
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
        /* database.ref("userInfo/" + uid).set({
          uid: uid,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.tel_country_code + values.tel_number,
          birthday: moment(values.birthday).toJSON(),
          allowedSearch: values.allowedSearch,
        }); */
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
      break;
  }
};

export const registerChildAccount = async ({
  values,
  registerChild,
  returnOnComplete,
}) => {
  /* let childUid = await nanoid();
  childUid = "ch-" + childUid;
  writeUserData({ registerChild, values, childUid, uid: auth.currentUser.uid }); */
  returnOnComplete();
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
    .catch((error) => {
      setServerError(error);
    });
};

export const createAccount = ({
  values,
  navigation,
  isProfessional,
  setServerError,
  returnOnComplete,
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
        returnOnComplete();
      })
      .catch((error) => {
        setServerError(error);
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
        returnOnComplete();
      })
      .catch((error) => {
        setServerError(error);
      });
  }
};
