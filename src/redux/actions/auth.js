export const saveAccessToken = (payload) => {
    return {
        type: "SAVE_ACCESS_TOKEN",
        payload: payload,
    };
};

export const changeLoadingState = (payload) => {
    return {
        type: "CHANGE_LOADING_STATE",
        payload: payload,
    };
};

export const saveSignedInUser = (payload) => {
    return {
        type: "SAVE_SIGNED_IN_USER",
        payload: payload,
    };
};