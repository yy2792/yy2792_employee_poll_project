export const RECEIVE_USERS = "RECEIVE_USERS";
export const SAVE_ANSWER_U = "SAVE_ANSWER_U";
export const ADD_QUESTION_U = "ADD_QUESTION_U";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}
