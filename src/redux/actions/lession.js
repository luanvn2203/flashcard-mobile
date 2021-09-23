export const saveListLessionFoundBySubjectId = (payload) => {
  return {
    type: "SAVE_LIST_LESSION_FOUND",
    payload: payload,
  };
};
export const saveTouchedLession = (payload) => {
  return {
    type: "SAVE_LESSION_TOUCHED",
    payload: payload,
  };
};
export const saveTouchedRequestLesson = (payload) => {
  return {
    type: "SAVE_REQUEST_LESSON_TOUCHED",
    payload: payload,
  };
};
