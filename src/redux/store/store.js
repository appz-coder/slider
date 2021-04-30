import React from "react";
import {combineReducers, createStore} from 'redux';
import { reducer as formReducer } from 'redux-form'
import presentationReducer from "./presentation_reducer";
import sliderReducer from "./slider_reducer";

const reducer = combineReducers({
    presentation:presentationReducer,
    slidersList:sliderReducer,
    form:formReducer
})


 const store = createStore(reducer);
export default store;
window.store =store;