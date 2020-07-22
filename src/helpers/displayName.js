export const displayName = (user) => {
  if (user.lastName && user.firstName) {
    return user.lastName + user.firstName;
  } else {
    return user.givenName + " " + user.surName;
  }
  if (true) {

  } else {
    if (user.surName && user.giveName) {
      return user.surName + user.giveName;
    } else {
      return user.lastName + user.firstName;
    }
  }
};
