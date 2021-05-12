import axios from "axios";
import {presentationApi} from "../../../component/api/api";

const GET_PRESENTATION = "GET-PRESENTATION";
const GET_PRESENTATION_SUCCESS = "GET-PRESENTATION-SUCCESS";
const GET_PRESENTATION_ERROR = "GET-PRESENTATION-ERROR";

const getPresentationAC = ()=>({type: GET_PRESENTATION});
const getPresentationSuccessAC = (payload)=>({type:GET_PRESENTATION_SUCCESS, payload });
const getPresentationErrorAC = (payload)=>({type:GET_PRESENTATION_ERROR, payload});

export const getPresentation = () =>{

    return async (dispatch)=>{
        try{
            dispatch(getPresentationAC())
            debugger
            const response = await presentationApi.getPresentation();
            dispatch(getPresentationSuccessAC(response.data))
        }catch (e){
            dispatch(getPresentationErrorAC("An error occurred..."))
        }
    }
}

