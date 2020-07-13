import { database, auth } from "../config/config";

export const UPDATE_FAMILY_MEMBERS = "UPDATE_FAMILY_MEMBERS";

export const updateFamilyMembers = (familyMembers) => {
  return {
    type: UPDATE_FAMILY_MEMBERS,
    payload: familyMembers,
  };
};

export const watchFamilyMembersUpdate = () => {
  return (dispatch) => {
    database
      .ref("/userInfo/" + auth.currentUser.uid + "/familyMembers")
      .on("value", (snap) => {
        let familyMembers = [];
        snap.forEach((data) => {
          familyMembers.push(data.val());
        });
        dispatch(updateFamilyMembers(familyMembers));
      });
  };
};

const initialState = [];

export const familyMembers = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_FAMILY_MEMBERS:
      return {
        familyMembers: payload,
      };
    default:
      return state;
  }
};
