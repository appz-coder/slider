import React from "react";
import {presentationApi} from "../../../component/api/api";


const SET_USERS_DATA = 'SET_USERS_DATA';
const SET_USERS_LOGIN_DATA = 'SET_USERS_LOGIN_DATA';
const LOG_OUT_USERS_LOGIN_DATA = 'LOG_OUT_USERS_LOGIN_DATA';

let initialState = {
    error:null,
    msg: "",
    username:"",
    isAuth: false

}
const  authReducer =(state = initialState, action) => {
    switch (action.type) {
        case SET_USERS_DATA: {
            return {
                ...state,
                error:action.payload.error,
                msg:action.payload.msg,
                username:action.payload.data.username,
                isAuth:true
            }
        }
        case LOG_OUT_USERS_LOGIN_DATA: {
            return initialState
        }

        default:  return state;

    }

}

export default  authReducer;


export const loginUserData = (payload) => ({type: SET_USERS_DATA,  payload});

export const logoutUserData = () => ({type: LOG_OUT_USERS_LOGIN_DATA});

export const authentificationGoogle = (currentPage) =>{
    return async (dispatch)=>{
        try{

            const response = await presentationApi.authGoogle();
            console.log(response)
        }catch (error){
            if (error.response) {
               console.log(error.response)

            }

        }
    }
}