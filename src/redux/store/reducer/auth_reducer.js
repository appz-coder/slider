import { presentationApi, setAuthHeader } from '../../../component/api/api';
import jwt_decode from 'jwt-decode';

const SET_USERS_GOOGLE_DATA = 'SET_USERS_GOOGLE_DATA';
const SET_USERS_DATA = 'SET_USERS_DATA';
const LOG_OUT_USERS_LOGIN_DATA = 'LOG_OUT_USERS_LOGIN_DATA';

let initialState = {
    error: null,
    accessToken: "",
    imageUrl: "",
    givenName: "",
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS_GOOGLE_DATA: {
            console.log("Token received in SET_USERS_GOOGLE_DATA:", token);
            const profileObj = jwt_decode(action.payload.token);
            return {
                ...state,
                error: false,
                imageUrl: profileObj.picture || "",
                givenName: profileObj.given_name || "",
            };
        }
        case LOG_OUT_USERS_LOGIN_DATA: {
            return initialState;
        }
        case SET_USERS_DATA: {
            console.log("Token received in SET_USERS_DATA:", token);
            return {
                ...state,
                accessToken: action.payload.data.token,
                isAuth: true
            };
        }
        default:
            return state;
    }
};

export default authReducer;

export const loginUserData = (payload) => {
    return { type: SET_USERS_GOOGLE_DATA, payload };
};

export const logoutUserData = () => {
    localStorage.removeItem('jwt_token');
    return { type: LOG_OUT_USERS_LOGIN_DATA };
};

export const setUsersDataAC = (payload) => ({ type: SET_USERS_DATA, payload });

export const setUsersData = (formData) => {
    return async (dispatch) => {
        try {
            const response = await presentationApi.authGoogle(formData);
            await localStorage.setItem('jwt_token', response.data.data.token);
            setAuthHeader(response.data.data.token);
            dispatch(setUsersDataAC(response.data));
        } catch (error) {
            if (error.response) {
                // Handle error response
            }
        }
    };
};
