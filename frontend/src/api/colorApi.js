import axios from 'axios';

const requestApi = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API,
});

export default requestApi;