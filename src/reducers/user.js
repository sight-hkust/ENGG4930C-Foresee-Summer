import { database, auth } from "../config/config";
import { decryptData } from "../utils/encryptData";

export const UPDATE_USER_INFO = "UPDATE_USER_INFO";

export const updateUserInfo = (user) => {
  return {
    type: UPDATE_USER_INFO,
    payload: user,
  };
};

export const watchUserInfoUpdate = () => {
  return (dispatch) => {
    database.ref("/users/" + auth.currentUser.uid).on("value", (snap) => {
      const userData = snap.val();
      if (userData["dataEncrypted"]) {
        const decrpytedUserData = decryptData(userData);
        dispatch(updateUserInfo(decrpytedUserData));
      } else {
        dispatch(updateUserInfo(userData));
      }
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
