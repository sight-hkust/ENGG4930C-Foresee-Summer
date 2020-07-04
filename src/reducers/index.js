const { combineReducers } = require("redux");
import { patientList } from "./patientList";
import { questionList } from "./askProfessionalList";
import { user } from "./user";
import { familyMembers } from "./familyMembers";

export default combineReducers({
  patientList,
  questionList,
  familyMembers,
  user,
});
