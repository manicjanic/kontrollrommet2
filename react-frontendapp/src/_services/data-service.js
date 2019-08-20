import {postalService} from './postal-service'

const postLogin = (username, password) => {
    const payload = { username: username, password: password }
    return postalService.post(payload, "userlogin/")
}

const getPacovs = () => {
    return postalService.get_auth("api/user/pacovs/")    
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
    postLogin,
    getPeppars,
    getRelations,
    getPepparTypes,
    getRelationTypes
};
