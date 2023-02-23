
import {presentationApi, setAuthHeader} from "../../../component/api/api";

const SET_USERS_GOOGLE_DATA = 'SET_USERS_GOOGLE_DATA';
const SET_USERS_DATA = 'SET_USERS_DATA';
const LOG_OUT_USERS_LOGIN_DATA = 'LOG_OUT_USERS_LOGIN_DATA';

let initialState = {
    error: null,
    accessToken: "",
    imageUrl: "",
    givenName: "",
    isAuth: false
}
const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USERS_GOOGLE_DATA: {
            return {
                ...state,
                error: false,
                imageUrl: action.payload.profileObj.imageUrl,
                givenName: action.payload.profileObj.givenName,
            }
        }
        case LOG_OUT_USERS_LOGIN_DATA: {
            return initialState
        }
        case SET_USERS_DATA: {
            return {
                ...state,
                accessToken: action.payload.data.token,
                isAuth: true
            }
        }

        default:
            return state;

    }

}

export default authReducer;


export const loginUserData = (payload) => {
    return {type: SET_USERS_GOOGLE_DATA, payload}
};

export const logoutUserData = () => {
    localStorage.removeItem('jwt_token');
    return {type: LOG_OUT_USERS_LOGIN_DATA}
};

export const setUsersDataAC = (payload) => ({type: SET_USERS_DATA, payload});

export const setUsersData = (formData) => {
    return async (dispatch) => {
        try {
            const response = await presentationApi.authGoogle(formData);
            await localStorage.setItem('jwt_token', response.data.data.token)
            setAuthHeader(response.data.data.token)
            dispatch(setUsersDataAC(response.data))
        } catch (error) {
            if (error.response) {


            }

        }
    }
}
