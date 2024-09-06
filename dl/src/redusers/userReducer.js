// alertReducer.js
const initialState = {
    // activityDictionary: {},
    // topNotificationIds: [],
    // showNotification: false,
    // newNotification: null,
    apiAlert: null,
    dlUsers: []
};

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_DLUSER_DETAIL":
            return {
                ...state,
                dlUsers: action.payload,
            };
        default:
            return state;
    }
};

export default alertReducer;