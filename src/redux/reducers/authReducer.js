const initialState = {
    accessToken: null,
    refreshToken: null,
    expirationTime: null,
    isLoading: null,
    currentUser: null
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'SAVE_ACCESS_TOKEN':
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                expirationTime: action.payload.expirationTime,
                currentUser: action.payload.currentUser

            };
        case 'CHANGE_LOADING_STATE':
            return {
                ...state,
                isLoading: action.payload
            };
        case 'SAVE_SIGNED_IN_USER':
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;