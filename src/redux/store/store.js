import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import { reducer as formReducer } from 'redux-form'
import presentationReducer from "./reducer/presentation_reducer";
import thunk from "redux-thunk";
import addPresentationReducer from "./reducer/add_presentation_reducer";
import authReducer from "./reducer/auth_reducer";
import showPresentationReducer from "./reducer/slider_reducer";

const reducer = combineReducers({
    presentation:presentationReducer,
    newPresentation:addPresentationReducer,
    auth:authReducer,
    showPresentation:showPresentationReducer,
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
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


 const store = createStore(reducer,loadFromLocalStorage(),composeEnhancers( applyMiddleware(thunk)));
 store.subscribe(() => saveToLocalStorage({auth: store.getState().auth}));

 export default store;
window.store =store;
