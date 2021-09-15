const initialState = {
  resultQuiz: null,
};

function submitQuizReducer(state = initialState, action) {
  switch (action.type) {
    case "SAVE_RESULT_QUIZ":
      return {
        ...state,
        resultQuiz: action.payload,
      };
    case "ALL_QUIZ_HISTORY_BY_ME":
      return {
        ...state,
        allQuizHistory: action.payload,
      };
    default:
      return state;
  }
}

export default submitQuizReducer;
