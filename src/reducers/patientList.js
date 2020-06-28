import { database, auth } from "../config/config";

export const UPDATE_PATIENT_LIST = 'UPDATE_PATIENT_LIST';

export const updatePatientList = (patientList) => {
    return {
        type: UPDATE_PATIENT_LIST,
        payload: patientList,
    }
}

export const watchPatientListUpdate = () => {
    return dispatch => {

        database.ref('/professionals/' + auth.currentUser.uid + '/patients')
            .on('value', snap => {
                let patientList = []
                snap.forEach(data => {
                    patientList.push(data.val());
                })
                dispatch(updatePatientList(patientList));
            })
    }
}

const initialState = []
export const patientList = (state = initialState, { type, payload }) => {
    switch (type) {
        case UPDATE_PATIENT_LIST:
            console.log("payload", payload)
            return {
                patientList: payload,
            }
        default:
            return state;
    }
}