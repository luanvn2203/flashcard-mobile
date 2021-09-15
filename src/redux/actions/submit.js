export const saveResultQuiz = (payload) => {
  return {
    type: "SAVE_RESULT_QUIZ",
    payload: payload,
  };
};

export const getAllQuizHistoryByMe = (payload) => {
  return {
    type: "ALL_QUIZ_HISTORY_BY_ME",
    payload: payload.getAllQuizHistoryByMe,
  };
};
