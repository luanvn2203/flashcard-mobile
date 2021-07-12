

export const saveTouchedFlashcard = (payload) => {
    return {
        type: "SAVE_FLASHCARD_TOUCHED",
        payload: payload,
    };
};
