import axios from 'axios';
import {authHeader} from '../_helpers/auth-header'
var apiBaseUrl = "http://localhost:8000/";

export const postalService = {
    post,
    get,
    get_auth, 
};

async function post(payload, api) {
    try {
        const response = await axios.post(apiBaseUrl + api, payload);
        return handleResponse(response);
    } catch(error) {
        return handleError(error)
    }
    
}

async function get(api) {
    const response = await axios.get(apiBaseUrl + api);
    return handleResponse(response);
}

async function get_auth(api) {
    const response = await axios.get(apiBaseUrl + api, { 'headers': authHeader() });
    return handleResponse(response);
}

function handleError(error) {
    console.log("Error", error)    
    const {data, status} = error.response
    const responseobj = {error: true, data: data, status: status}
    return responseobj
}
function handleResponse(response) {
    const {data, status} = response
    const responseobj = {error: false, data: data, status: status}
    console.log("Responseobj", responseobj)
    return responseobj
}