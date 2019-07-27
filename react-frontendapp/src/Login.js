import React, { Component } from 'react';
import {userService} from './_services/user.service'
import { withRouter } from 'react-router'

import LoginForm from './LoginForm';

class Login extends Component {
  
    constructor(props){
        super(props);
        // Bind functions so they can access this
        this.doLogin = this.doLogin.bind(this);

    }

    componentDidMount() {
        // Initial operations
        userService.logout();
        this.props.ModifyState("isLoggedin", false)
    }

    doLogin(username, password) {
        userService.login(username, password)
        .then(() => {
            this.props.ModifyState("isLoggedin", true)
            this.props.history.push('/loader')
        });
    }
    
    render() {
      return (
          <div className="container">
            <LoginForm
                doLogin={this.doLogin}    
            />
          </div>
      );
  }
}

export default withRouter(Login);