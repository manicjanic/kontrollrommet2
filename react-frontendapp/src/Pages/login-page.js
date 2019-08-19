import React, { Component } from 'react';
import {dataService} from '../_services/data-service'

import LoginForm from '../Components/login-form'

export default class LoginPage extends Component {

    // Async Login rutine, returns responseobj
    attemptLogin = async (username, password) => {
        // Call dataservice to process login data
        const responseobj = await dataService.postLogin(username, password)
        //Then deal with the response
        if (!responseobj.error) {
            localStorage.setItem('userobj', JSON.stringify(responseobj.data));
            this.props.modifyState({is_loggedin: true})
            this.props.history.push('/')
        }
        else {
            console.log(responseobj.status, responseobj.data[0])
        }
        return responseobj
    }
        
    render() {
        return (
            <LoginForm 
                handleLogin={this.attemptLogin}
            />

        );
    }
}