const initialState = {
  listLessionBySubjectId: null,
  lessionTouched: null,
  requestLessonTouched: null,
};

function lessionReducer(state = initialState, action) {
  switch (action.type) {
    case "SAVE_LIST_LESSION_FOUND":
      return {
        ...state,
        listLessionBySubjectId: action.payload,
      };
    case "SAVE_LESSION_TOUCHED":
      return {
        ...state,
        lessionTouched: action.payload,
      };
    case "SAVE_REQUEST_LESSON_TOUCHED":
      return {
        ...state,
        requestLessonTouched: action.payload,
      };
    default:
      return state;
  }
}

export default lessionReducer;
