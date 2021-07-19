const initialState = {
  touchedQuiz: null,
};

function quizReducer(state = initialState, action) {
  switch (action.type) {
    case "SAVE_QUIZ_TOUCHED":
      return {
        ...state,
        touchedQuiz: action.payload,
      };
    default:
      return state;
  }
}

export default quizReducer;
