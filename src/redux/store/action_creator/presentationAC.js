import axios from "axios";

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
            const response = await axios.get('http://localhost:4000/api/presentations');
            dispatch(getPresentationSuccessAC(response.data))
        }catch (e){
            dispatch(getPresentationErrorAC("An error occurred..."))
        }
    }
}

