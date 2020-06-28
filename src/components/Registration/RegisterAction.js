import { auth, database } from '../../config/config';
import moment from 'moment';

const writeUserData = ({ uid = null, values, isProfessional, navigation, registerPatient = false }) => {
  if (registerPatient) {
    database.ref('professionals/' + uid + '/patients/' + values.phone).set(
      {
        firstName: values.firstname,
        lastName: values.lastname,
        phone: values.phone,
      }
    );
    database.ref('userInfo/' + values.phone).set({
      uid: uid,
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      age: moment(values.birthday).toJSON(),
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
        firstName: values.firstname,
        lastName: values.lastname,
        birthday: moment(values.birthday).toJSON(),
        records: {},
      });
      database.ref('userInfo/' + values.phone).set({
        firstname: values.firstname,
        lastname: values.lastname,
        birthday: moment(values.birthday).toJSON(),
      });
    } else {
      database.ref('/professionals/' + uid).set({
        uid: uid,
        firstname_chi: values.firstname_chi,
        lastname_chi: values.lastname_chi,
        email: values.email,
        phone: values.phone,
        role: values.role,
      });
    }
  }
};

export const registerPatientAccount = ({ values, isProfessional, registerPatient, navigation }) => {
  const uid = auth.currentUser.uid;
  writeUserData({ uid, values, isProfessional, registerPatient, navigation });
  navigation.goBack();
};

export const createAccount = ({ values, navigation, isProfessional, registerPatient }) => {
  if (isProfessional) {
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(function (userCreds) {
        const uid = userCreds.user.uid;
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
        navigation.navigate('Profile');
        writeUserData({ uid, values, navigation, isProfessional });
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  }
};
