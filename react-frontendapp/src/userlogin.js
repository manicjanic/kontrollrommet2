import React, { Component } from 'react';
import axios from 'axios';

import UploadScreen from './UploadScreen';

class UserLogin extends Component {
  
  constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
        username : '',
        password : ''
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
      var apiBaseUrl = "http://localhost:8000/";
      var self = this;
      var payload = {
        "username" : this.state.username,
        "password" : this.state.password
      }
      console.log(payload);
      axios.post(apiBaseUrl+'userlogin'+'/', payload)
      .then(function (response) {
          console.log(response);
          if(response.data.code == 200){
              console.log("Login successfull");
              var uploadScreen=[];
              uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
              self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
          }
          else if(response.data.code == 204){
              console.log("Username password do not match");
              alert("username password do not match")
          }
          else{
              console.log("Username does not exists");
              alert("Username does not exist");
          }
      })
      .catch(function (error) {
          console.log(error);
      });
  }

  render() {
      return (
          <div>
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

const style = {
margin: 15,
};

export default UserLogin;