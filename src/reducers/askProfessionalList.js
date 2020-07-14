import { database } from '../config/config';

export const UPDATE_QUESTION_LIST = 'UPDATE_QUESTION_LSIT';

export const updateQuestionList = (questionList) => {
  return {
    type: UPDATE_QUESTION_LIST,
    payload: questionList,
  };
};

export const watchQuestionListUpdate = () => {
  return (dispatch) => {
    database
      .ref('/contents/askProf')
      .orderByChild('createdDate')
      .on('value', (snap) => {
        let questionList = [];
        snap.forEach((question) => {
          if (question.val()['response'] != null) {
            questionList.push({
              question_id: question.key,
              tags: question.val()['tags'],
              question_title: question.val()['subject'],
              question_content: question.val()['content'],
              answer: question.val()['response']['content'],
              prof_name: question.val()['response']['firstName'] + question.val()['response']['lastName'],
              prof_title: question.val()['response']['role'],
            });
          }
        });
        console.log(questionList);
        dispatch(updateQuestionList(questionList));
      });
  };
};

export const questionList = (state = [], { type, payload }) => {
  switch (type) {
    case UPDATE_QUESTION_LIST:
      return {
        questionList: payload,
      };
    default:
      return state;
  }
};
