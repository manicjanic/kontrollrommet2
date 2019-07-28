export function authHeader() {
    // return authorization header with basic auth credentials
    let token = JSON.parse(localStorage.getItem('token'));
    console.log("inside auth header", token.token)
    if (token) {
        console.log("deeper inside auth header", { 'Authorization': 'Token ' + token.token })
        return { 'Authorization': 'Token ' + token.token };
    } else {
        return {};
    }
}