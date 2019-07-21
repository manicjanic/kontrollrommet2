import axios from 'axios';

export function PostalService(payload, api) {
    console.log("running postal service...")
    var apiBaseUrl = "http://localhost:8000/";

    return axios.post(apiBaseUrl + api +'/', payload)
    .then((response) => {
        console.log("I got this response from server:",response);
        return response
    })
    .catch(function (error) {
        console.log("Sorry, I Catched an error:", error);
        return error
    });
    
}
