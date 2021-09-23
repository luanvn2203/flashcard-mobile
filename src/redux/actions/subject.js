export const saveListSubjectInterest = (payload) => {
  return {
    type: "SAVE_LIST_SUBJECT_INTEREST",
    payload: payload,
  };
};

export const saveSubjectIdTouched = (payload) => {
  return {
    type: "SAVE_SUBJECT_TOUCHED",
    payload: payload,
  };
};
export const saveTouchedRequestSubject = (payload) => {
  return {
    type: "SAVE_REQUEST_SUBJECT_TOUCHED",
    payload: payload,
  };
};
export const saveTouchedRecentLearning = (payload) => {
  return {
    type: "SAVE_RECENT_LEARNING_TOUCHED",
    payload: payload,
  };
};
