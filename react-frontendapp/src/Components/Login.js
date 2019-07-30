import React, { Component } from 'react';
import {dataService} from '../_services/data.service'
import { withRouter } from 'react-router'

import LoginForm from './LoginForm';

class Login extends Component {
  
    constructor(props){
        super(props);
        // Bind functions so they can access this
        this.doLogin = this.doLogin.bind(this);
        this.doLogout = this.doLogout.bind(this);
    }

     // Initial operations
    componentDidMount() {
        this.doLogout();
    }

    // Callback functions to deal with input from Layout element

    doLogout() {
        // remove token from local storage
        localStorage.removeItem('token');
        this.props.ModifyState("isLoggedin", false)
    }
    
    doLogin(username, password) {
        // Call dataservice to process login data
        dataService.sendLogin(username, password)
        //Then deal with the response
        .then(data => {
                // store user details and basic auth credentials in local storage 
                data.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('token', JSON.stringify(data));
                this.props.ModifyState("isLoggedin", true)
                this.props.history.push('/loader')
        });
    }
    
    render() {
        return (
            <LoginForm doLogin={this.doLogin}/>
        );
    }
}

export default withRouter(Login);