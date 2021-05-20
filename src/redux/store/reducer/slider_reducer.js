import React from "react";
const FETCH_PRESENTATION = "FETCH-PRESENTATION";
const FETCH_PRESENTATION_SUCCESS = "FETCH-PRESENTATION-SUCCESS";
const FETCH_PRESENTATION_ERROR = "FETCH-PRESENTATION-ERROR";
const RETURN_FETCH_PRESENTATION = "RETURN-FETCH-PRESENTATION";


const initialState = {
    showPresentation:[
        {mime:''}
        // {id:1, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnm4e-ZiUDGp_27jKFvXGSKOx6hRhRjxoVORDiWI7Y0IrOjA8cTH121Xc6uUlyME3Zh0&usqp=CAU"},
        // {id:2, img:"https://www.xmple.com/wallpaper/gray-plain-solid-color-single-one-colour-1920x1080-c-9899a6-f-24.svg"},
        // {id:3, img:"https://www.xmple.com/wallpaper/single-one-colour-solid-color-gray-plain-1920x1080-c-757676-f-24.svg"},
        // {id:4, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnm4e-ZiUDGp_27jKFvXGSKOx6hRhRjxoVORDiWI7Y0IrOjA8cTH121Xc6uUlyME3Zh0&usqp=CAU"},
        // {id:5, img:"https://www.xmple.com/wallpaper/gray-plain-solid-color-single-one-colour-1920x1080-c-9899a6-f-24.svg"},
        // {id:6, img:"https://www.xmple.com/wallpaper/single-one-colour-solid-color-gray-plain-1920x1080-c-757676-f-24.svg"},
        // {id:7, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnm4e-ZiUDGp_27jKFvXGSKOx6hRhRjxoVORDiWI7Y0IrOjA8cTH121Xc6uUlyME3Zh0&usqp=CAU"},
        // {id:8, img:"https://www.xmple.com/wallpaper/gray-plain-solid-color-single-one-colour-1920x1080-c-9899a6-f-24.svg"},
        // {id:9, img:"https://www.xmple.com/wallpaper/single-one-colour-solid-color-gray-plain-1920x1080-c-757676-f-24.svg"},
        // {id:10, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnm4e-ZiUDGp_27jKFvXGSKOx6hRhRjxoVORDiWI7Y0IrOjA8cTH121Xc6uUlyME3Zh0&usqp=CAU"}
    ],
    is_private:null,
    title:'',
    error:null,
    loading:false,

}


const showPresentationReducer = (state = initialState, action) =>{
    switch (action.type) {
        case FETCH_PRESENTATION:
                return {
                    ...state,
                    loading:true, error:null,showPresentation:[]};
        case FETCH_PRESENTATION_SUCCESS:
            localStorage.setItem('showPresentation',JSON.stringify(action.payload.data.presentation_file))
            return {
                ...state,
                loading:false,
                error:action.payload.error,
                is_private:action.payload.data.is_private,
                showPresentation:action.payload.data.presentation_file,
                title:action.payload.data.title
            };
        case FETCH_PRESENTATION_ERROR:
                return {
                    ...state,
                    loading:false,  error:action.payload.error,showPresentation:[]
                };
        case RETURN_FETCH_PRESENTATION:{
            return initialState
        }

        default: return state
    }
}

export default showPresentationReducer;

