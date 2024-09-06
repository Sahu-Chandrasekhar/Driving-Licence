const initialState = {
    authUser: false,
    userData: {}
};

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_USER_DETAIL":
            return {
                ...state,
                userData: action.payload,
                authUser: true
            };
        case "REMOVE_USER_DETAIL":
            return {
                ...state,
                userData: {},
                authUser: false
            };

        default:
            return state;
    }
};

export default alertReducer;