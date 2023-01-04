import { getInitialData, saveQuestionAnswer, saveQuestion } from "../utils/api";
import { receiveQuestions, saveAnswerQuestion, addQuestion } from "./questions";
import { receiveUsers, saveAnswerUser, addQuestionU } from "./users";

export function handleData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}

export function handleSaveAnswer(info) {
  return (dispatch) => {
    saveQuestionAnswer(info)
      .then(() => {
        dispatch(saveAnswerQuestion(info));
        dispatch(saveAnswerUser(info));
      })
      .catch((e) => {
        console.log("Error while saving answer to database: ", e);
        alert("Answer not saved.");
      });
  };
}
