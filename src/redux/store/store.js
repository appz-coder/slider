import React from "react";
import {applyMiddleware, combineReducers, createStore} from 'redux';
import { reducer as formReducer } from 'redux-form'
import presentationReducer from "./reducer/presentation_reducer";
import sliderReducer from "./reducer/slider_reducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
    presentation:presentationReducer,
    slidersList:sliderReducer,
    form:formReducer
})


 const store = createStore(reducer, applyMiddleware(thunk));
export default store;
window.store =store;