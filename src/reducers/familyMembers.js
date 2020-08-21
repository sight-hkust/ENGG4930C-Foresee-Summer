import { database, auth } from "../config/config";

export const UPDATE_FAMILY_MEMBERS = "UPDATE_FAMILY_MEMBERS";

export const updateFamilyMembers = (familyMembers) => {
  return {
    type: UPDATE_FAMILY_MEMBERS,
    payload: familyMembers,
  };
};

export const watchFamilyMembersUpdate = (dispatch) => {
  database
    .ref("/users/" + auth.currentUser.uid + "/familyMembers")
    .on("value", (snap) => {
      let user = null;
      let familyMembers = [];

      database
        .ref("/users/" + auth.currentUser.uid)
        .once("value")
        .then((subSnapshot) => {
          const temp = subSnapshot.val();
          user = {
            uid: temp.uid,
            surName: temp.surName,
            givenName: temp.givenName,
            lastName: temp.lastName,
            firstName: temp.firstName,
          };

          if (user) {
            familyMembers.push(user);
          }
          snap.forEach((data) => {
            familyMembers.push(data.val());
          });
          dispatch(updateFamilyMembers(familyMembers));
        });
    });
};

const initialState = null;

export const familyMembers = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_FAMILY_MEMBERS:
      return payload;
    default:
      return state;
  }
};
