
import {presentationApi, PublicApi} from "../../../component/api/api";

const GET_PRESENTATION = "GET-PRESENTATION";
const GET_PRESENTATION_SUCCESS = "GET-PRESENTATION-SUCCESS";
const GET_PRESENTATION_ERROR = "GET-PRESENTATION-ERROR";
const CHANGE_PRESENTATION_PRIVATE_STATE = "CHANGE_PRESENTATION_PRIVATE_STATE";

const getPresentationAC = ()=>({type: GET_PRESENTATION});
const getPresentationSuccessAC = (payload)=>({type:GET_PRESENTATION_SUCCESS, payload });
const getPresentationErrorAC = (payload)=>({type:GET_PRESENTATION_ERROR, payload});
export const presentationPrivateStateAC = (payload, key) => ({type: CHANGE_PRESENTATION_PRIVATE_STATE, payload, key});

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

export const toModifyPublic = (checked,key) =>{
    return async (dispatch)=>{
        try{
          const res = await PublicApi.checkedPrivate(checked,key)
            dispatch(presentationPrivateStateAC(res.data, key))
        }catch (error){
            console.log(error)
        }
    }

}

