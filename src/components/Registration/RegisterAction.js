import { auth, database } from '../../config/config';
import moment from 'moment';

const writeUserData = ({ uid = null, values, isProfessional, navigation, registerPatient = false }) => {
  if (registerPatient) {
    database.ref('professionals/' + uid + '/patients/' + values.phone).set({
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
    });
    database.ref('userInfo/' + values.phone).set({
      uid: uid,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      birthday: moment(values.birthday).toJSON(),
      job: values.job,
      history: values.history,
      disease: values.disease,
    });
  } else {
    if (!isProfessional) {
      database.ref('/users/' + uid).set({
        uid: uid,
        email: values.email,
        phone: values.phone,
        firstName: values.firstName,
        lastName: values.lastName,
        birthday: moment(values.birthday).toJSON(),
        records: {},
      });
      database.ref('userInfo/' + values.phone).set({
        firstName: values.firstName,
        lastName: values.lastName,
        birthday: moment(values.birthday).toJSON(),
      });
    } else {
      database.ref('/professionals/' + uid).set({
        uid: uid,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        role: values.role,
      });
    }
  }
};

export const registerPatientAccount = ({ values, isProfessional, registerPatient, onComplete }) => {
  const uid = auth.currentUser.uid;
  writeUserData({ uid, values, isProfessional, registerPatient });
  onComplete();
};

export const createAccount = ({ values, navigation, isProfessional, registerPatient }) => {
  if (isProfessional) {
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(function (userCreds) {
        const uid = userCreds.user.uid;
        if (userCreds) {
          userCreds.user.updateProfile({ displayName: 'professional' });
        }
        navigation.navigate('Profile');
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
          userCreds.user.updateProfile({ displayName: 'user' });
        }
        navigation.navigate('Profile');
        writeUserData({ uid, values, navigation, isProfessional });
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  }
};
