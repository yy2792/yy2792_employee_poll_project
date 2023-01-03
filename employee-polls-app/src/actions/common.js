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
