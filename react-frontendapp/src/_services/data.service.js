import {postalService} from './postal.service'

const getAllPeppars = () => {
    return postalService.get(null, "api/peppars")    
}

const getAllPepparRelations = () => {
    
}

const getUserData = () => {
    
}

export const dataService = {
    getAllPeppars,
    getAllPepparRelations,
    getUserData
};
