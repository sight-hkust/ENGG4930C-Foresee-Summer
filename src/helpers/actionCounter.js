import * as firebase from 'firebase';

/**
 * view_type: 1) articles 2) askProf
 * view_id: id of Node
 * action: 1) view 2) liked
 */
export function actionCounter(view_type, view_id, action) {
  let countViews = firebase.functions().httpsCallable('countViews');
  countViews({ type: view_type, id: view_id, action: action }).catch((err) => {
    console.log(err);
  });
}
