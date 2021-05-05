import React from "react";
const initialState = {
    sliders:[
        {id:1, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnm4e-ZiUDGp_27jKFvXGSKOx6hRhRjxoVORDiWI7Y0IrOjA8cTH121Xc6uUlyME3Zh0&usqp=CAU"},
        {id:2, img:"https://www.xmple.com/wallpaper/gray-plain-solid-color-single-one-colour-1920x1080-c-9899a6-f-24.svg"},
        {id:3, img:"https://www.xmple.com/wallpaper/single-one-colour-solid-color-gray-plain-1920x1080-c-757676-f-24.svg"},
        {id:4, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnm4e-ZiUDGp_27jKFvXGSKOx6hRhRjxoVORDiWI7Y0IrOjA8cTH121Xc6uUlyME3Zh0&usqp=CAU"},
        {id:5, img:"https://www.xmple.com/wallpaper/gray-plain-solid-color-single-one-colour-1920x1080-c-9899a6-f-24.svg"},
        {id:6, img:"https://www.xmple.com/wallpaper/single-one-colour-solid-color-gray-plain-1920x1080-c-757676-f-24.svg"},
        {id:7, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnm4e-ZiUDGp_27jKFvXGSKOx6hRhRjxoVORDiWI7Y0IrOjA8cTH121Xc6uUlyME3Zh0&usqp=CAU"},
        {id:8, img:"https://www.xmple.com/wallpaper/gray-plain-solid-color-single-one-colour-1920x1080-c-9899a6-f-24.svg"},
        {id:9, img:"https://www.xmple.com/wallpaper/single-one-colour-solid-color-gray-plain-1920x1080-c-757676-f-24.svg"},
        {id:10, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnm4e-ZiUDGp_27jKFvXGSKOx6hRhRjxoVORDiWI7Y0IrOjA8cTH121Xc6uUlyME3Zh0&usqp=CAU"}
    ]

}


const sliderReducer = (state = initialState, action) =>{
    switch (action.type) {
        default: return state
    }
}

export default sliderReducer;

