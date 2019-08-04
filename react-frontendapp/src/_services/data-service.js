import {postalService} from './postal-service'

const sendLogin = (username, password) => {
    const payload = { username: username, password: password }
    return postalService.post(payload, "userlogin/")
}

const getPeppars = () => {
    return postalService.get_auth("api/user/peppars/")    
}

const getRelations = () => {
    return postalService.get_auth("api/user/relations/")    
}

const getPepparTypes = () => {
    return postalService.get_auth("api/catalog/peppartype/")    
}

const getRelationTypes = () => {
    return postalService.get_auth("api/catalog/relationtype/")    
}

export const dataService = {
    sendLogin,
    getPeppars,
    getRelations,
    getPepparTypes,
    getRelationTypes
};