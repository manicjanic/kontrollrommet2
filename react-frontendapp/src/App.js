import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react';
import { Route } from "react-router";
import { PrivateRoute } from './_components';


// Layout elements
import NavBar from './NavBar';
import Login from './Login';
import PepparList from './PepparList';
// Loader
import Loader from './Loader';


class App extends Component {
    
    constructor(props){
        super(props);
        // Defining Central State
        this.state = {
            isLoggedin: false,
            myCloseCircle: [ {}, ],
            myRelations: [ {}, ],
            myCloseRelations:[ {}, ],
            userdata: {
                peppar: {name: ""}
            }
        }
        // Making functions available
        this.LoggedIn = this.LoggedIn.bind(this);
        this.ModifyState = this.ModifyState.bind(this);
    }

    // Page Layout and distribution of data and callbacks to the children
    LoginSetup = () => (
    <div>
        <NavBar
            userdata={this.state.userdata}
            isLoggedin={this.state.isLoggedin}
        />
        <Login
            LoggedIn={this.LoggedIn}
            ModifyState={this.ModifyState}
        />
    </div>
    );
    
    HomeSetup = () => (
    <div>
        <NavBar 
            userdata={this.state.userdata}
            isLoggedin={this.state.isLoggedin}
        />
        <div className="container">
            This is the Home page of Kontrollrommet. 
            Log in or create new user to take control.
        </div>
    </div>
    );
    
    DashboardSetup = () => (
    <div>
        <NavBar 
            userdata={this.state.userdata}
            isLoggedin={this.state.isLoggedin}
        />
        <div className="container">
            This is the Dashboard. Main control mastered from here.
        </div>
        <PepparList 
                peppars={this.state.peppars}
                ModifyState={this.ModifyState}
        />
    </div>
    );
    
    LoaderSetup = () => (
        <div>
            <Loader
                ModifyState={this.ModifyState}
            />
        </div>
    )

    // Currently not used
    LogoutSetup = () => (
    <div>
        <NavBar
            userdata={this.state.userdata}
            isLoggedin={this.state.isLoggedin}
        />
        <Login
            LoggedIn={this.LoggedIn}
        />
    </div>
    );
    
    // Callback functions to manipulate state
    ModifyState(statekey, statevalue) {
        this.setState({[statekey] : statevalue})
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
                <PrivateRoute exact path="/loader" component={this.LoaderSetup} />
            </div>
        )
    }
}

export default App;