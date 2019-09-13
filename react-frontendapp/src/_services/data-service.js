import {postalService} from './postal-service'
import {filterService} from './filter-service'
import {constructionService} from './construction-service'
import {PACOV_ID, RELATION_ID} from '../Hardcoded/lookup-table'


// Direct filter operations
const getLocal_all_meetings_enhanced = (pacovs, relations) => {
    let meetings = filterService.filterPacovsByCategory(pacovs, PACOV_ID.MEETING)
    let meetings_enhanced = constructionService.enhancePacovs(meetings, pacovs, relations)
    return meetings_enhanced
}

const getLocal_all_requests_enhanced = (pacovs, relations) => {
    let requests = filterService.filterPacovsByCategory(pacovs, PACOV_ID.REQUEST)
    let requests_enhanced = constructionService.enhancePacovs(requests, pacovs, relations)
    return requests_enhanced
}

const getServer_all_pacovs = async () => {
    let url = ""
    const returnobj = await postalService.get_auth(url) 
    console.log("returnobj", returnobj.data)
    return returnobj.data    
}


const postLogin = (username, password) => {
    const payload = { username: username, password: password }
    return postalService.post(payload, "userlogin/")
}

const getDataAuth = async (url) => {
    const returnobj = await postalService.get_auth(url) 
    console.log("returnobj", returnobj.data)
    return returnobj.data    
}

const postDataAuth = async (url, payload) => {
    const returnobj = await postalService.post_auth(url, payload) 
    console.log("returnobj", returnobj.data)
    return returnobj.data    
}

export const dataService = {
    getLocal_all_meetings_enhanced,
    getLocal_all_requests_enhanced,
    postLogin,
    getDataAuth,
    postDataAuth,
};
