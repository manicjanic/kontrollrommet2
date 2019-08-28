import {postalService} from './postal-service'

const postLogin = (username, password) => {
    const payload = { username: username, password: password }
    return postalService.post(payload, "userlogin/")
}

const getPacovs = async () => {
    const returnobj = await postalService.get_auth("api/user/pacovs/") 
    console.log("returnobj", returnobj.data)
    return returnobj.data    
}

const getRelations = async () => {
    const returnobj = await postalService.get_auth("api/user/relations/") 
    console.log("returnobj", returnobj.data)
    return returnobj.data   
}

const getPacovTypes = async () => {
    const returnobj = await postalService.get_auth("api/catalog/pacovtype/")
    console.log("returnobj", returnobj.data)
    return returnobj.data   
}

const getRelationTypes = async () => {
    const returnobj = await postalService.get_auth("api/catalog/relationtype/")
    console.log("returnobj", returnobj.data)
    return returnobj.data    
}
const getPacovSubTypes = async () => {
    const returnobj = await postalService.get_auth("api/catalog/pacovsubtype/")
    console.log("returnobj", returnobj.data)
    return returnobj.data   
}

const getRelationSubTypes = async () => {
    const returnobj = await postalService.get_auth("api/catalog/relationsubtype/")
    console.log("returnobj", returnobj.data)
    return returnobj.data    
}

export const dataService = {
    postLogin,
    getPacovs,
    getRelations,
    getPacovTypes,
    getRelationTypes,
    getPacovSubTypes,
    getRelationSubTypes
};
