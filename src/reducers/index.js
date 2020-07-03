const { combineReducers } = require('redux');
import { patientList } from './patientList';
import { questionList } from './askProfessionalList';
import { user } from './user';

export default combineReducers({
  patientList,
  questionList,
  user,
});
