const { combineReducers } = require("redux");
import { patientList } from "./patientList";
import { questionList } from "./askProfessionalList";
import { user } from "./user";
import { familyMembers } from "./familyMembers";
import { records } from "./records";

export default combineReducers({
  patientList,
  questionList,
  familyMembers,
  records,
  user,
});
