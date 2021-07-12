import { GET_BOOKS } from '../actions/auth';

const initialState = {
    books: [1, 2, 3],
    bookmarks: []
};

function booksReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BOOKS:
            return { ...state, books: action.payload };
        default:
            return state;
    }
}

export default booksReducer;