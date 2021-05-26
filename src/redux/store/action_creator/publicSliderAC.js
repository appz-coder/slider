
import { PublicApi} from "../../../component/api/api";

const FETCH_PRESENTATION = "FETCH-PRESENTATION";
const FETCH_PRESENTATION_SUCCESS = "FETCH-PRESENTATION-SUCCESS";
const FETCH_PRESENTATION_ERROR = "FETCH-PRESENTATION-ERROR";

const fetchPresentationAC = ()=>({type: FETCH_PRESENTATION});
const fetchPresentationSuccessAC = (payload)=>({type:FETCH_PRESENTATION_SUCCESS, payload });
const fetchPresentationErrorAC = (payload)=>({type:FETCH_PRESENTATION_ERROR, payload});

export const fetchPublicPresentation = (key) =>{
    return async (dispatch)=>{
        try{
            dispatch(fetchPresentationAC())
            const response = await PublicApi.getPublicPresentation(key);
            await dispatch(fetchPresentationSuccessAC(response.data))
        }catch (error){
            if (error.response) {
               await dispatch(fetchPresentationErrorAC(error.response))

            }

        }
    }
}
