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
