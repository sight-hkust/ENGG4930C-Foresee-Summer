import { database, auth } from "../config/config";

export const UPDATE_PATIENT_LIST = 'UPDATE_PATIENT_LIST';

const initialState = {}


export const updatePatientList = (patientList) => {
    return {
        type: UPDATE_PATIENT_LIST,
        payload: patientList,
    }
}

export const watchPatientListUpdate = () => {
    console.log(auth.currentUser.uid)
    return dispatch => {
        let patientList = []
        database.ref('/professionals/' + auth.currentUser.uid + '/patients')
            .on('value', snap => {
                snap.forEach(data => {
                     patientList.push(data.val()); 
                })
                dispatch(updatePatientList(patientList))
            })
    }
}
export const patientList = (state = initialState, { type, payload }) => {
    switch (type) {
        case UPDATE_PATIENT_LIST:
            return {
                patientList: payload,
            }

        default:
            return state;
    }
}