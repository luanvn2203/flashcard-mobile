const initialState = {
    flashcardTouched: null,
};

function flashcardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SAVE_FLASHCARD_TOUCHED':
            return {
                ...state,
                flashcardTouched: action.payload
            }
        default:
            return state;
    }
}

export default flashcardReducer;