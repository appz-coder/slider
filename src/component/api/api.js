import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export const setAuthHeader = (token) => {
    instance.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export const presentationApi = {
    createPresentation(formData) {
        return instance.post('api/presentations/store', formData);
    },
    getPresentation(currentPage) {
        return instance.get(`api/presentations/pages/${currentPage}`);
    },
    fetchPresentation(secret_key) {
        return instance.get(`api/presentations/slug/${secret_key}`);
    },
    authGoogle(data) {
        console.log('Sending authGoogle request:', data); // Debugging line to check auth request
        return instance.post('api/auth/user', data);
    }
};

export const PublicApi = {
    getPublicPresentation(key) {
        return instance.get(`api/public-presentations/public-slug/${key}`);
    },
    checkedPrivate(checked, key) {
        return instance.get(`api/presentations/${key}/update/${checked}`);
    }
};

console.log('API URL:', process.env.REACT_APP_API_URL); // Debugging line to check API URL
