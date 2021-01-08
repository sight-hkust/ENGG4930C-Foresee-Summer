import { auth, database } from "../../config/config";
import moment from "moment";
import * as firebase from "firebase";
import { nanoid } from "nanoid/async/index.native";
import { encryptData } from "../../utils/encryptData";
require("firebase/functions");

const addEncryptDataTag = (object) => {
  return Object.assign(object, { dataEncrypted: true });
};

const writeUserData = ({ uid = null, values, isProfessional, registerPatient = false, patientUid = null, registerChild = false, childUid = null }) => {
  switch (true) {
    case registerPatient:
      database.ref("professionals/" + uid + "/patients/" + patientUid).set({
        uid: patientUid,
        inactive: true,
        firstName: values.firstName || "",
        lastName: values.lastName || "",
      });
      database.ref("users/" + patientUid).set(
        encryptData({
          uid: patientUid,
          inactive: true,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          birthday: moment(values.birthday).format("YYYY-MM-DD"),
          job: values.job,
          history: values.history,
          disease: values.disease,
          dataEncrypted: true,
        })
      );
      if (!values.parentSelectionDisalbed && values.parent.uid) {
        database.ref("users/" + values.parent.uid + "/familyMembers/" + patientUid).set({
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

      database.ref("users/" + childUid).set(
        encryptData({
          uid: childUid,
          inactive: true,
          firstName: values.firstName || "",
          lastName: values.lastName || "",
          birthday: moment(values.birthday).format("YYYY-MM-DD"),
          job: values.job,
          history: values.history,
          disease: values.disease,
          allowedSearch: values.allowedSearch,
          dataEncrypted: true,
        })
      );
      break;
    default:
      if (!isProfessional) {
        database.ref("/users/" + uid).set(
          encryptData({
            uid: uid,
            email: values.email,
            tel_code: values.tel_country_code,
            phone: values.tel_number,
            firstName: values.firstName,
            lastName: values.lastName,
            birthday: moment(values.birthday).format("YYYY-MM-DD"),
            records: {},
            dataEncrypted: true,
          })
        );
      } else {
        database.ref("/professionals/" + uid).set(
          addEncryptDataTag(
            encryptData({
              uid: uid,
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              tel_code: values.tel_country_code,
              phone: values.tel_number,
              role: values.role,
              part: values.part,
              dataEncrypted: true,
            })
          )
        );
      }
      break;
  }
};

export const registerChildAccount = async ({ values, registerChild, targetUser_uid = null, returnOnComplete }) => {
  let childUid = await nanoid();
  childUid = "ch-" + childUid;
  if (targetUser_uid) {
    writeUserData({ registerChild, values, childUid, uid: targetUser_uid });
  } else {
    writeUserData({ registerChild, values, childUid, uid: auth.currentUser.uid });
  }
  returnOnComplete();
};

export const registerPatientAccount = async ({ values, returnOnComplete, setServerError }) => {
  let createPatientAccount = firebase.functions().httpsCallable("createPatientAccount");
  createPatientAccount({
    email: values.email,
  })
    .then((response) => {
      console.log(response);
      writeUserData({
        uid: auth.currentUser.uid,
        patientUid: response.data.uid,
        values,
        registerPatient: true,
      });
      returnOnComplete();
    })
    .catch((error) => {
      setServerError(error);
    });
};

export const createAccount = ({ values, navigation, isProfessional, setServerError, returnOnComplete }) => {
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
