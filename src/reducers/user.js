import { database, auth } from '../config/config';

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

export const updateUserInfo = (user) => {
  return {
    type: UPDATE_USER_INFO,
    payload: user,
  };
};

export const watchUserInfoUpdate = () => {
  return (dispatch) => {
    database.ref('/users/' + auth.currentUser.uid).on('value', (snap) => {
      dispatch(updateUserInfo(snap.val()));
    });
  };
};

export const user = (state = [], { type, payload }) => {
  switch (type) {
    case UPDATE_USER_INFO:
      return {
        user: payload,
      };
    default:
      return state;
  }
};
