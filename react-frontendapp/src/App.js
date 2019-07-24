import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react';
import { Route } from "react-router";
import { PrivateRoute } from './_components';


// View elements
import NavBar from './NavBar';
import LoginForm from './LoginForm';
import PepparList from './PepparList.js';


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
    
    // Currently not used
    LogoutSetup = () => (
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
            This is the Home page of Kontrollrommet. 
            Log in or create new user to take control.
        </div>
    </div>
    );
    
    DashboardSetup = () => (
        <div>
            <div>
                <NavBar 
                    userdata={this.state.userdata}
                    isLoggedin={this.state.isLoggedin}
                />
            </div>
            <div className="container">
                This is the Dashboard. Main control mastered from here.
            </div>
            <div>
                <PepparList 
                    userdata={this.state.userdata}
                    isLoggedin={this.state.isLoggedin}
                />
            </div>

        </div>
        );
        
    
    LoadMaincontainer(content) {
        this.setState({Maincontainer : content},)
        console.log(content)
    }

    LoggedIn(setting) {
        this.setState({isLoggedin : setting})
        console.log("ran LoggedIn")
    }
    
    render() {        
        return (
            <div>
                <Route path="/" exact = {true} render = {this.HomeSetup}/>
                <Route path="/login" exact = {true} render = {this.LoginSetup}/>
                <Route path="/logout" exact = {true} render = {this.LoginSetup}/>
                <PrivateRoute exact path="/dashboard" component={this.DashboardSetup} />

                
            </div>
        )
    }
}

export default App;