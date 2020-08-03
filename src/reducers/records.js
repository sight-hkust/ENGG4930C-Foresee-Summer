import { database } from '../config/config';

export const GET_EYE_TEST_RECORDS = 'GET_EYE_TEST_RECORDS';
export const UPDATE_EYE_TEST_RECORDS = 'UPDATE_EYE_TEST_RECORDS';

/* export const setRecordStore = (records, uid, inactive) => {
  return {
    type: GET_EYE_TEST_RECORDS,
    payload: {
      records,
      uid,
      inactive,
    },
  };
}; */

export const updateRecords = (dateList, records) => {
  return {
    type: UPDATE_EYE_TEST_RECORDS,
    payload: {
      dateList: dateList,
      records: records,
    },
  };
};

export const getRecordsUpdate = (uid, inactive) => {
  return (dispatch) => {
    let recordsRef = database.ref('/users/' + uid + '/records');
    recordsRef
      .orderByKey()
      .once('value')
      .then((snap) => {
        let date = [];
        snap.forEach((data) => {
          date.push(data.key);
        });
        dispatch(updateRecords(date, snap.toJSON()));
      });
  };
};

const initialState = {};
export const records = (state = initialState, { type, payload }) => {
  switch (type) {
    /* case GET_EYE_TEST_RECORDS:
      return {
        records: payload.records,
        uid: payload.uid,
        inactive: payload.inactive,
      }; */
    case UPDATE_EYE_TEST_RECORDS:
      return {
        dateList: payload.dateList,
        records: payload.records,
      };
    default:
      return state;
  }
};
