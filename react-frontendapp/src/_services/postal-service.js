import axios from 'axios';
import {authHeader} from '../_helpers/auth-header'
var apiBaseUrl = "http://localhost:8000/";

export const postalService = {
    post,
    get,
    get_auth, 
};

function post(payload, api) {
    return axios.post(apiBaseUrl + api, payload)
     .then(handleResponse)
}

function get(api) {
    return axios.get(apiBaseUrl + api)
     .then(handleResponse)
}

function get_auth(api) {
    return axios.get(apiBaseUrl + api , { 'headers': authHeader() })
     .then(handleResponse)
}

function handleResponse(response) {
    return response.data
}