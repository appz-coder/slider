
import {presentationApi} from "../../../component/api/api";

const GET_PRESENTATION = "GET-PRESENTATION";
const GET_PRESENTATION_SUCCESS = "GET-PRESENTATION-SUCCESS";
const GET_PRESENTATION_ERROR = "GET-PRESENTATION-ERROR";

const getPresentationAC = ()=>({type: GET_PRESENTATION});
const getPresentationSuccessAC = (payload)=>({type:GET_PRESENTATION_SUCCESS, payload });
const getPresentationErrorAC = (payload)=>({type:GET_PRESENTATION_ERROR, payload});

export const getPresentation = (currentPage) =>{
    return async (dispatch)=>{
        try{
            dispatch(getPresentationAC())
            const response = await presentationApi.getPresentation(currentPage);
            dispatch(getPresentationSuccessAC(response.data))
        }catch (error){
            if (error.response) {
                dispatch(getPresentationErrorAC(error.response))

            }

        }
    }
}

