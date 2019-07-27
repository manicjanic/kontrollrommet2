import React, { Component } from 'react';

class LoginForm extends Component {
  
    constructor(props){
        super(props);
        // Define local state
        this.state = {
            username : '',
            password : '',
        }
        // Bind functions to be used in component
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        // Initial operations
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
        this.props.doLogin(this.state.username, this.state.password)
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

export default LoginForm