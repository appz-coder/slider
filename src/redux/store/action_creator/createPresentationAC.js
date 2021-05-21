import {presentationApi} from "../../../component/api/api";


const ADD_PRESENTATION = "ADD-PRESENTATION";
const ADD_PRESENTATION_SUCCESS = "ADD-PRESENTATION-SUCCESS";
const ADD_PRESENTATION_ERROR = "ADD-PRESENTATION-ERROR";
const RETURN_PRESENTATION_STATE = "RETURN_PRESENTATION_STATE";

const addPresentationAC = ()=>({type: ADD_PRESENTATION});
const addPresentationSuccessAC = (payload)=>({type:ADD_PRESENTATION_SUCCESS, payload });
const addPresentationErrorAC = (payload)=>({type:ADD_PRESENTATION_ERROR, payload});
export  const returnPresentationStateAC = ()=>({type:RETURN_PRESENTATION_STATE});

export const presentationCreated = (formData) =>{

    return async (dispatch)=>{
        try {
            dispatch(addPresentationAC());
            let resp = await presentationApi.createPresentation(formData)
            dispatch(addPresentationSuccessAC(resp))
        }catch (error){
            if (error.response) {
                dispatch(addPresentationErrorAC(error.response))
            }
        }
    }
}

