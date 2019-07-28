import {postalService} from './postal.service'

// import { authHeader } from '../_helpers';

const login = (username, password) => {
    
    const payload = {
        username: username,
        password: password
    }

    return postalService.post(payload, "userlogin/")

}

const logout = () => {
    // remove token from local storage
    localStorage.removeItem('token');
}

export const userService = {
    login,
    logout,
};
