import React from "react";
const FETCH_PRESENTATION = "FETCH-PRESENTATION";
const FETCH_PRESENTATION_SUCCESS = "FETCH-PRESENTATION-SUCCESS";
const FETCH_PRESENTATION_ERROR = "FETCH-PRESENTATION-ERROR";
const RETURN_FETCH_PRESENTATION = "RETURN-FETCH-PRESENTATION";


const initialState = {
    showPresentation:[],
    is_private:null,
    title:'',
    error:null,
    loading:false,

}


const showPresentationReducer = (state = initialState, action) =>{
    switch (action.type) {
        case FETCH_PRESENTATION:
                return {
                    ...state,
                    loading:true, error:null,showPresentation:[]};
        case FETCH_PRESENTATION_SUCCESS:
            return {
                ...state,
                loading:false,
                error:action.payload.error,
                is_private:action.payload.data.is_private,
                showPresentation:action.payload.data.presentation_file,
                title:action.payload.data.title
            };
        case FETCH_PRESENTATION_ERROR:
                return {
                    ...state,
                    loading:false,  error:action.payload.error,showPresentation:[]
                };
        case RETURN_FETCH_PRESENTATION:{
            return initialState
        }

        default: return state
    }
}

export default showPresentationReducer;

