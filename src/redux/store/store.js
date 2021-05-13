import React from "react";
import {applyMiddleware, combineReducers, createStore} from 'redux';
import { reducer as formReducer } from 'redux-form'
import presentationReducer from "./reducer/presentation_reducer";
import sliderReducer from "./reducer/slider_reducer";
import thunk from "redux-thunk";
import addPresentationReducer from "./reducer/add_presentation_reducer";
import authReducer from "./reducer/auth_reducer";

const reducer = combineReducers({
    presentation:presentationReducer,
    slidersList:sliderReducer,
    newPresentation:addPresentationReducer,
    auth:authReducer,
    form:formReducer
})

// convert object to string and store in localStorage
function saveToLocalStorage(state) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("persistantState", serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem("persistantState");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

 const store = createStore(reducer,loadFromLocalStorage(), applyMiddleware(thunk));
store.subscribe(() => saveToLocalStorage({auth: store.getState().auth}));
export default store;
window.store =store;