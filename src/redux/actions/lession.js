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
