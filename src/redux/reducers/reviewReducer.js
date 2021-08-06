const initialState = {
  resultQuiz: null,
};

function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case "SAVE_HISTORY_QUIZ":
      return {
        ...state,
        historyQuiz: action.payload,
      };
    default:
      return state;
  }
}

export default reviewReducer;
