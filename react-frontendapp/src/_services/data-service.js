import {postalService} from './postal-service'

const postLogin = (username, password) => {
    const payload = { username: username, password: password }
    return postalService.post(payload, "userlogin/")
}

const getDataAuth = async (url) => {
    const returnobj = await postalService.get_auth(url) 
    console.log("returnobj", returnobj.data)
    return returnobj.data    
}

export const dataService = {
    postLogin,
    getDataAuth,
};
