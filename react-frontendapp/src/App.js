import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react';
import { Route } from "react-router";
import { PrivateRoute } from './_components';


// Layout elements
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import PepparList from './Components/PepparList';
// Loader
import Loader from './Components/Loader';


class App extends Component {
    
    constructor(props){
        super(props);
        // Defining Central State
        this.state = {
            // App Status
            isLoggedin: false,
            isLoading: false,
            // Collected Peppars and Relations viewable to user
            mePeppar: {},
            myPeppars: [ {}, ],
            myRelations: [ {}, ],
            // Derived collections of Peppars and Relations based on functionality
            myEntityRelations: [ {} ],
            userdata: {
                peppar: {name: ""}
            }
        }
        // Making functions available
        this.ModifyState = this.ModifyState.bind(this);
    }

    // Page Layout and distribution of data and callbacks to the children
    LoginSetup = () => (
    <div>
        <Login
            ModifyState={this.ModifyState}
        />
    </div>
    );
    
    HomeSetup = () => (
    <div>
        <div className="container">
            This is the Home page of Kontrollrommet. 
            Log in or create new user to take control.
        </div>
    </div>
    );
    
    DashboardSetup = () => (
    <div>
        <div className="container">
            This is the Dashboard. Main control mastered from here.
        </div>
        <PepparList 
                myPeppars={this.state.myPeppars}
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
        <Login
            LoggedIn={this.LoggedIn}
        />
    </div>
    );
    
    // Callback functions to manipulate state
    ModifyState(statekey, statevalue) {
        this.setState({[statekey] : statevalue})
    }
    
    render() {        
        return (
            <div>
                <NavBar
                    userdata={this.state.userdata}
                    isLoggedin={this.state.isLoggedin}
                    mePeppar={this.state.mePeppar}
                    myEntityRelations={this.state.myEntityRelations}
                />
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