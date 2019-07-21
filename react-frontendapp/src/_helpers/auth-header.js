export function authHeader() {
    // return authorization header with basic auth credentials
    let token = localStorage.getItem('token');

    if (token) {
        return { 'Authorization': 'Token ' + token };
    } else {
        return {};
    }
}