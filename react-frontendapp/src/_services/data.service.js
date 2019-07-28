import {postalService} from './postal.service'

const getAllPeppars = () => {
    return postalService.get("api/peppars/")    
}

const getUserPeppars = () => {
    return postalService.get_auth("api/user/peppars/")    
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
    getAllPeppars,
    getAllPepparRelations,
    getUserPeppars,
    getUserData,
    getMyRelations,
    getCloseCircle,
    getCloseRelations,
};
