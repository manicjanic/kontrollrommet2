export function authHeader() {
    // return authorization header with basic auth credentials
    let token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        return { 'Authorization': 'Token ' + token.token };
    } else {
        return {};
    }
}