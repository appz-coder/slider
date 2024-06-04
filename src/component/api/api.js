import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL; // Assuming you have the environment variable set

// Check if the environment variable exists before creating the instance
if (!baseURL) {
  console.error('REACT_APP_API_URL environment variable not found!');
}

const instance = axios.create({
  baseURL,
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
    // Assuming the server-side endpoint is correct (replace if needed)
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

console.log('API URL:', baseURL); // Debugging line to check API URL
