
import {presentationApi} from "../../../component/api/api";

const FETCH_PRESENTATION = "FETCH-PRESENTATION";
const FETCH_PRESENTATION_SUCCESS = "FETCH-PRESENTATION-SUCCESS";
const FETCH_PRESENTATION_ERROR = "FETCH-PRESENTATION-ERROR";
const RETURN_FETCH_PRESENTATION = "RETURN-FETCH-PRESENTATION";

const fetchPresentationAC = ()=>({type: FETCH_PRESENTATION});
const fetchPresentationSuccessAC = (payload)=>({type:FETCH_PRESENTATION_SUCCESS, payload });
const fetchPresentationErrorAC = (payload)=>({type:FETCH_PRESENTATION_ERROR, payload});
export const returnFetchPresentationStateAC = ()=>({type:RETURN_FETCH_PRESENTATION});

export const fetchPresentation = (secret_key) =>{
    return async (dispatch)=>{
        try{
            dispatch(fetchPresentationAC())
            const response = await presentationApi.fetchPresentation(secret_key);
            dispatch(fetchPresentationSuccessAC(response.data))
        }catch (error){
            if (error.response) {
                dispatch(fetchPresentationErrorAC(error.response))

            }

        }
    }
}
