import {postalService} from './postal.service'

const sendLogin = (username, password) => {
    const payload = {
        username: username,
        password: password
    }
    return postalService.post(payload, "userlogin/")
}

const getMe = () => {
    return postalService.get_auth("api/user/me")    
}

const getPeppars = () => {
    return postalService.get_auth("api/user/peppars/")    
}

const getRelations = () => {
    return postalService.get_auth("api/user/relations/")    
}


export const dataService = {
    sendLogin,
    getMe,
    getPeppars,
    getRelations,
};
