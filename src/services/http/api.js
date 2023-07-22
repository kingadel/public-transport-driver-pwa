import axios from 'axios';
import {BASE_URL, BASE_URL_TRUCK} from '../../constants/Constants';

const API = axios.create({
    baseURL: BASE_URL
});

API.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log("axios error", error);
    console.log("axios error response", error.response);
    return Promise.reject(error.response);
});

const TruckApi = axios.create({
    baseURL: BASE_URL_TRUCK
});

TruckApi.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log("axios error", error);
    console.log("axios error response", error.response);
    return Promise.reject(error.response);
});

export {API , TruckApi};