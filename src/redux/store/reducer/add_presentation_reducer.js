const ADD_PRESENTATION = "ADD-PRESENTATION";
const ADD_PRESENTATION_SUCCESS = "ADD-PRESENTATION-SUCCESS";
const ADD_PRESENTATION_ERROR = "ADD-PRESENTATION-ERROR";
const RETURN_PRESENTATION_STATE = "RETURN_PRESENTATION_STATE";

const initialState = {
    statusText: "",
    messages: "",
    loading: false,
    errors: null,
    isProcessed: false
}

const addPresentationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRESENTATION:
            return {
                ...state,
                loading: true,
                errors: null,
                messages: "",
                isProcessed: false
            };
        case ADD_PRESENTATION_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: false,
                isProcessed: true,
                messages: action.payload.data.msg,
                statusText: action.payload.statusText
            };
        case ADD_PRESENTATION_ERROR:
            return {
                ...state,
                loading: false,
                errors: true,
                messages: 'Something went wrong',
                statusText: action.payload.statusText
            };
        case RETURN_PRESENTATION_STATE:
            return initialState;
        default:
            return state
    }
}

export default addPresentationReducer;

