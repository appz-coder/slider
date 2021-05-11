import React from "react";
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4000/api/',
    headers: {
        "Content-Type": "multipart/form-data;" +
            "boundary=<calculated when request is sent>",
    },

})
export const presentationApi = {

    createPresentation(formData) {
        return instance.post('presentations/store', formData)
    },
}
