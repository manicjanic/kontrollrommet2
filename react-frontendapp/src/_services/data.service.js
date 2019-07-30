import {postalService} from './postal.service'

const sendLogin = (username, password) => {
    const payload = {
        username: username,
        password: password
    }
    return postalService.post(payload, "userlogin/")
}

const getPeppars = () => {
    return postalService.get_auth("api/user/peppars/")    
}

const getRelations = () => {
    return postalService.get_auth("api/user/relations/")    
}

const getAllPeppars = () => {
    return postalService.get("api/peppars/")    
}

const getAllPepparRelations = () => {
    
}

const getUserData = () => {
    return postalService.get_auth("api/user/me")     
}

const getMyRelations = () => {
    return postalService.get_auth("api/user/myrelations")     
}

const getCloseCircle = () => {
    return postalService.get_auth("api/user/innercircle")     
}

const getCloseRelations = () => {
    return postalService.get_auth("api/user/innercirclerelations")     
}

export const dataService = {
    sendLogin,
    getPeppars,
    getRelations,
    getAllPeppars,
    getAllPepparRelations,
    getUserData,
    getMyRelations,
    getCloseCircle,
    getCloseRelations,
};
