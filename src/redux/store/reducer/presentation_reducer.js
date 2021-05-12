const GET_PRESENTATION = "GET-PRESENTATION";
const GET_PRESENTATION_SUCCESS = "GET-PRESENTATION-SUCCESS";
const GET_PRESENTATION_ERROR = "GET-PRESENTATION-ERROR";

const initialState = {
    presentationsCount:null,
    Presentation:[],
    loading:false,
    error:null

}


const presentationReducer = (state = initialState, action) =>{
    switch (action.type) {
        case GET_PRESENTATION:
            return {
                ...state,
                loading:true, error:null,Presentation:[]};
        case GET_PRESENTATION_SUCCESS:
            return {
                ...state,
                loading:false,
                error:null,
                presentationsCount:action.payload.data.presentationsCount,
                Presentation:action.payload.data.presentations};
        case GET_PRESENTATION_ERROR:
            return {
                ...state,
                loading:false, error:action.payload.error, Presentation:[]};
        default:return state
    }
}

export default presentationReducer;

