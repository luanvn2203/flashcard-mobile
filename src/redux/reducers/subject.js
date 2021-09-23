const initialState = {
  listSubjectInterest: null,
  touchedSubject: null,
};

function subjectReducer(state = initialState, action) {
  switch (action.type) {
    case "SAVE_LIST_SUBJECT_INTEREST":
      return {
        ...state,
        listSubjectInterest: action.payload,
      };

    case "SAVE_SUBJECT_TOUCHED":
      return {
        ...state,
        touchedSubject: action.payload,
      };
    case "SAVE_REQUEST_SUBJECT_TOUCHED":
      return {
        ...state,
        requestSubjectTouched: action.payload,
      };
    case "SAVE_RECENT_LEARNING_TOUCHED":
      return {
        ...state,
        recentLearningTouched: action.payload,
      };
    default:
      return state;
  }
}

export default subjectReducer;
