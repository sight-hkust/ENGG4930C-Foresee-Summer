import { auth, database } from "../../config/config";
import moment from 'moment';
const writeUserData = ({ uid, values, isProfessional, navigation, establishedByProfessional = false }) => {
    if (isProfessional) {
        database.ref('/professionals/' + uid)
            .set({
                uid: uid,
                name: values.name,
                email: values.email,
                phone: values.phone,
            })
    } else {
        if (establishedByProfessional) {
            database.ref('/users/' + uid)
                .set({
                    uid: uid,
                    name: values.name,
                    email: values.email,
                    age: Math.abs(moment(values.birthYearsAndMonths).diff(moment(), "years")),
                    phone: values.phone,
                    job: values.job,
                    history: values.history,
                    disease: values.disease
                })

            database.ref('professionals/M001/patients/' + uid + '/info')
                .set({
                    uid: uid,
                    name: values.name,
                    email: values.email,
                    age: Math.abs(moment(values.birthYearsAndMonths).diff(moment(), "years")),
                    phone: values.phone,
                    job: values.job,
                    history: values.history,
                    disease: values.disease
                })
        }
        else {
            database.ref('/users/' + uid)
                .set({
                    uid: uid,
                    name: values.name,
                    email: values.email,
                    age: Math.abs(moment(values.birthYearsAndMonths).diff(moment(), "years")),
                    phone: values.phone,
                })
        }

    }
    navigation.navigate('MainScreen');
}


export const createAccount = ({ values, navigation, isProfessional, establishedByProfessional }) => {
    if (isProfessional) {
        console.log('values.email', values.email);
        auth.createUserWithEmailAndPassword(values.email, values.password).then(function (userCreds) {
            const uid = userCreds.user.uid;
            writeUserData({ uid, values, navigation, isProfessional, establishedByProfessional });
        }).catch(error => {
            console.log(error.code, error.message);
        })
    } else {
        if (establishedByProfessional) {
            auth.createUserWithEmailAndPassword(values.email, "NoPassword").then(function (userCreds) {
                const uid = userCreds.user.uid;
                writeUserData({ uid, values, isProfessional, navigation, establishedByProfessional });
            }).catch(error => {
                console.log(error.code, error.message);
            })
        }
        else {
            auth.createUserWithEmailAndPassword(values.email, values.password).then(function (userCreds) {
                const uid = userCreds.user.uid;
                writeUserData({ uid, values, navigation, establishedByProfessional });
            }).catch(error => {
                console.log(error.code, error.message);
            })
        }

    }
}