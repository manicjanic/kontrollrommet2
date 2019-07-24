
export const DataService = {
    getAllPeppars,
    getAllPepparRelations,
    getUserData
};
    
    var apiBaseUrl = "http://localhost:8000/";

    const getAllPeppars = () => {
        let api = "user/peppars/"
        return axios.get(apiBaseUrl + api, payload)
        .then((response) => {
            console.log("I got this response from server:",response);
            return response
        })
    
    }

    const getAllPepparRelations = () => {
        
    }

    const getUserData = () => {
        
    }

