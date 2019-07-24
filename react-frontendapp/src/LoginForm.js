import React, { Component } from 'react';
import {userService} from './_services/user.service'
import { withRouter } from 'react-router'

class LoginForm extends Component {
  
    constructor(props){
        super(props);
        userService.logout();
        this.props.LoggedIn(false)
        // Bind the functions
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        // Define state
        this.state = {
            username : '',
            password : '',
        }
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        console.log("sending password and username to userService.login");
        userService.login(this.state.username, this.state.password)
        .then(result => {
                console.log("Login succeeded")
                this.props.LoggedIn(true)
                this.props.history.push('/')
        })
    }
    
    render() {
      return (
          <div className="container">
              <form onSubmit={this.onSubmit}>
                  <div className="form-group"> 
                      <label>Username: </label>
                      <input  
                          type="text"
                          className="form-control"
                          onChange={this.onChangeUsername}
                      />
                  </div>
                  <div className="form-group">
                      <label>Password: </label>
                      <input 
                          type="password" 
                          className="form-control"
                          onChange={this.onChangePassword}
                      />
                  </div>
                  <br />
                  <div className="form-group">
                      <input type="submit" value="Enter" className="btn btn-primary" />
                  </div>
              </form>
          </div>
      );
  }
}

export default withRouter(LoginForm);