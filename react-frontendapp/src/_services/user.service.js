import {postalService} from './postal.service'

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

    return postalService.post(payload, "userlogin")
    .then(data => {
        // login successful if there's a user in the response
        if (data.token) {
            // store user details and basic auth credentials in local storage 
            // to keep user logged in between page refreshes
            data.authdata = window.btoa(username + ':' + password);
            localStorage.setItem('user', JSON.stringify(data));
        }

        return data;
    });

}

function logout() {
    // remove token from local storage
    localStorage.removeItem('user');
}

