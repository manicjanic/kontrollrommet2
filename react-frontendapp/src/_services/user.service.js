import {PostalService} from './postal.service'

// import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
};

function login(username, password) {
    const payload = {
        username: username,
        password: password
    }

    return PostalService(payload, "userlogin")
    .then((response) => {
        console.log("Here is response from Postal Service:", response)
        if (response.data) {
            localStorage.setItem('token', response.data.token)
            console.log("stored this token in local storage", response.data.token)
            return "loggedin"   
        }
        else {
            console.log("Postal Service responded with an error", response)
            return "error"
        }   
    })

}

function logout() {
    // remove token from local storage
    localStorage.removeItem('token');
}