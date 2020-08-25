import { database, auth } from "../config/config";

export const GET_USER_ARTICLE_SCORE = "GET_USER_ARTICLE_SCORE";

export const getUserArticleScore = (userArticleScoreList) => {
    return {
        type: GET_USER_ARTICLE_SCORE,
        payload: userArticleScoreList,
    };
};

export const watchUserArticleScore = () => {
    return (dispatch) => {
        database
            .ref("users/" + auth.currentUser.uid + "/article_score")
            .on("value", (snap) => {
                let userArticleScoreList = [];
                userArticleScoreList.push(snap.val());
                dispatch(getUserArticleScore(userArticleScoreList));
            });
    };
};

export const userArticleScoreList = (state = [], { type, payload }) => {
    switch (type) {
        case GET_USER_ARTICLE_SCORE:
            return {
                userArticleScoreList: payload,
            };
        default:
            return state;
    }
};
