const initialState = {
    listLessionBySubjectId: null,
    lessionTouched: null,
};

function lessionReducer(state = initialState, action) {
    switch (action.type) {
        case 'SAVE_LIST_LESSION_FOUND':
            return {
                ...state,
                listLessionBySubjectId: action.payload
            };
        case 'SAVE_LESSION_TOUCHED':
            return {
                ...state,
                lessionTouched: action.payload
            }
        default:
            return state;
    }
}

export default lessionReducer;