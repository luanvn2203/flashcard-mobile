
const initialState = {
    books: [],
    bookmarks: [],
};

function booksReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOOKS':
            return { ...state, books: action.payload.books, bookmarks: action.payload.bookmarks };
        default:
            return state;
    }
}

export default booksReducer;