// alertReducer.js
const initialState = {
    activityDictionary: {},
    topNotificationIds: [],
    showNotification: false,
    newNotification: null,
    apiAlert: null,
};

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_API_ALERT":
            return {
                ...state,
                apiAlert: {
                    ...action.payload,
                    createdAt: new Date(),
                },
            };
        case "CLEAR_API_ALERT":
            return {
                ...state,
                apiAlert: null,
            };
        default:
            return state;
    }
};

export default alertReducer;