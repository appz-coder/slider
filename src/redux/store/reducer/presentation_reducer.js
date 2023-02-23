const GET_PRESENTATION = "GET-PRESENTATION";
const GET_PRESENTATION_SUCCESS = "GET-PRESENTATION-SUCCESS";
const GET_PRESENTATION_ERROR = "GET-PRESENTATION-ERROR";
const CHANGE_PRESENTATION_PRIVATE_STATE = "CHANGE_PRESENTATION_PRIVATE_STATE";
const ADD_PRESENTATION_SUCCESS = "ADD-PRESENTATION-SUCCESS";

const initialState = {
    Presentation:[],
    loading:false,
    error:null,
    pageSize: 10,
    totalCount: 0,
    currentPage:0,


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
                error:action.payload.error,
                 totalCount:action.payload.data.presentationsCount,
               Presentation:action.payload.data.presentations
               };
        case GET_PRESENTATION_ERROR:
            return {
                ...state,
                loading:false, error:action.payload.statusText, Presentation:[]};
        case ADD_PRESENTATION_SUCCESS:
            let newPresentation = action.payload.data.data
            return {
                ...state,
                totalCount: state.totalCount + 1,
                Presentation:[newPresentation, ...state.Presentation]
            };
        case CHANGE_PRESENTATION_PRIVATE_STATE:
            return {
                ...state,
                Presentation: state.Presentation.map(pres => {
                    if (pres.secret_key === action.key) {
                        let a = {...pres, is_private:action.payload.data.secret};
                        return a;
                    }
                    return pres;
                })
            };
        default:return state
    }
}

export default presentationReducer;

