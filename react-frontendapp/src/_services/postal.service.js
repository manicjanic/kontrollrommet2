import axios from 'axios';

var apiBaseUrl = "http://localhost:8000/";


export const postalService = {
    post,
    get, 
};

console.log("running postal service...")

function post(payload, api) {
    return axios.post(apiBaseUrl + api +'/', payload)
     .then(handleResponse)
}

function get(payload, api) {
    return axios.get(apiBaseUrl + api +'/')
     .then(handleResponse)
}

function handleResponse(response) {
    console.log ("running handle response", response)
    return response.data
}