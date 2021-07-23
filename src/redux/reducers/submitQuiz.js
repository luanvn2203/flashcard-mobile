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
    default:
      return state;
  }
}

export default submitQuizReducer;
