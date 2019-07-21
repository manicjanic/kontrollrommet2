import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react';
import { Route } from "react-router";

// View elements
import NavBar from './NavBar';
import LoginForm from './LoginForm';


class App extends Component {
    
    constructor(props){
        super(props);
        // Making functions available
        this.LoggedIn = this.LoggedIn.bind(this);
        this.LoadMaincontainer = this.LoadMaincontainer.bind(this);
        // Central State
        this.state = {
            isLoggedin: false,
            peppars: {},
            pepparrelations: {},
            userdata: {
                firstname: "Janic", 
                lastname: "Heen"   
            }
        }
    }

    LoginSetup = () => (
        <div>
            <NavBar
                userdata={this.state.userdata}
                isLoggedin={this.state.isLoggedin}
            />
            <LoginForm
                LoggedIn={this.LoggedIn}
            />
        </div>
    );
    
    HomeSetup = () => (
    <div>
        <div>
            <NavBar 
                userdata={this.state.userdata}
                isLoggedin={this.state.isLoggedin}
            />
        </div>
        <div className="container">
            This is Kontrollrommet. Log in og create new user to take control.
        </div>
    </div>
    );
    
    LoadMaincontainer(content) {
        this.setState({Maincontainer : content},)
        console.log(content)
    }

    LoggedIn() {
        this.setState({isLoggedin : true})
        console.log("ran LoggedIn")
    }
    
    render() {        
        return (
            <div>
                <Route path="/login" exact = {true} render = {this.LoginSetup}/>
                <Route path="/" exact = {true} render = {this.HomeSetup}/>
            </div>
        )
    }
}

export default App;