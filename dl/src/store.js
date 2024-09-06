import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "react-router-redux";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./redusers/index";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["router"],
};

export const history = createBrowserHistory();
const persistedReducer = persistReducer(persistConfig, rootReducer(history));

export default function configureStore(preloadedState) {
    const composeEnhancer = process.env.NODE_ENV !== "production" && window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_
        ? window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_
        : compose;

    const middleware = applyMiddleware(
        routerMiddleware(history),
        thunk
    );

    const enhancer = composeEnhancer(middleware);

    const store = createStore(
        persistedReducer,
        preloadedState,
        enhancer
    );

    const persistor = persistStore(store);

    return { store, persistor };
}