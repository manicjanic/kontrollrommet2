import {postalService} from './postal-service'

const postLogin = (username, password) => {
    const payload = { username: username, password: password }
    return postalService.post(payload, "userlogin/")
}

const getPacovs = () => {
    return postalService.get_auth("api/user/pacovs/")    
}

const getRelations = () => {
    return postalService.get_auth("api/user/relations/")    
}

const getPacovTypes = () => {
    return postalService.get_auth("api/catalog/pacovtype/")    
}

const getRelationTypes = () => {
    return postalService.get_auth("api/catalog/relationtype/")    
}

export const dataService = {
    postLogin,
    getPacovs,
    getRelations,
    getPacovTypes,
    getRelationTypes
};
