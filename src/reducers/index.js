const { combineReducers } = require('redux');
import { patientList } from './patientList';
import { questionList } from './askProfessionalList';

export default combineReducers({
  patientList,
  questionList,
});
