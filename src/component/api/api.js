
import axios from "axios";

const jwt = localStorage.getItem('jwt_token') ? localStorage.getItem('jwt_token') : null

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "multipart/form-data boundary=<calculated when request is sent>",
        'Authentication': `Bearer ${jwt}`
    },
})

export const setAuthHeader = (token) => {
    instance.defaults.headers.Authentication = `Bearer ${token}`
}

export const presentationApi = {

    createPresentation(formData) {
        return instance.post('api/presentations/store', formData)
    },
    getPresentation(currentPage) {

        return instance.get(`api/presentations/pages/${currentPage}`)
    },
    fetchPresentation(secret_key) {
        return instance.get(`api/presentations/slug/${secret_key}`)
    },
    authGoogle(data) {
        return instance.post('api/auth/user', data)
    }
}
export const PublicApi = {
    getPublicPresentation(key) {
        return instance.get(`api/public-presentations/public-slug/${key}`)
    },
    checkedPrivate(checked,key) {
        return instance.get(`api/presentations/${key}/update/${checked}`)
    }
}