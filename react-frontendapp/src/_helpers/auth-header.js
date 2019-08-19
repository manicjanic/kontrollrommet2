export function authHeader() {
    // return authorization header with basic auth credentials
    let userobj = JSON.parse(localStorage.getItem('userobj'));
    if (userobj.token) {
        return { 'Authorization': 'Token ' + userobj.token };
    } else {
        return {};
    }
}