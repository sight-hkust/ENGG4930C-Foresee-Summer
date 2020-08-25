import { database, auth } from "../config/config";

export const UPDATE_USER_INFO = "UPDATE_USER_INFO";

export const updateUserInfo = (user) => {
    return {
        type: UPDATE_USER_INFO,
        payload: user,
    };
};

export const watchUserInfoUpdate = () => {
    return (dispatch) => {
        if (auth.currentUser) {
            database
                .ref("/users/" + auth.currentUser.uid)
                .on("value", (snap) => {
                    //dispatch(updateUserInfo(snap.val()));
                    if (snap.val() != null) {
                        dispatch(updateUserInfo(snap.val()));
                    }
                });
            database
                .ref("/professionals/" + auth.currentUser.uid)
                .on("value", (snap) => {
                    //dispatch(updateUserInfo(snap.val()));
                    if (snap.val() != null) {
                        dispatch(updateUserInfo(snap.val()));
                    }
                });
            // database.ref("/users/" + auth.currentUser.uid).on("value", (snap) => {
            //   dispatch(updateUserInfo(snap.val()));
            // });
        }
    };
};

export const getUserInfoUpdate = (uid, isProfessional) => {
    return (dispatch) => {
        let node = (isProfessional ? "/professionals/" : "/users/") + uid;
        if (isProfessional) {
            database
                .ref(node)
                .once("value")
                .then((snapshot) => {
                    const userData = snapshot.val();
                    if (userData["dataEncrypted"]) {
                        const decrpytedUserData = decryptData(userData);
                        dispatch(updateUserInfo(decrpytedUserData));
                    } else {
                        dispatch(updateUserInfo(userData));
                    }
                });
        }
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
