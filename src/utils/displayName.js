export const displayName = (user) => {
    if (user.lastName && user.firstName) {
        return user.lastName + user.firstName;
    } else {
        return user.givenName + " " + user.surName;
    }
};
