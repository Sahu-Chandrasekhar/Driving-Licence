import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import AlertReducer from "./alertReducer";
import DLUserReducer from './userReducer';
import UserReducer from './authReducer';

const rootReducer = (history) =>
  combineReducers({
    router: routerReducer(history),
    alert: AlertReducer,
    dluser: DLUserReducer,
    auth: UserReducer
  });

export default rootReducer;