import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react';
import { Route } from "react-router";
import { PrivateRoute } from './_components';

import {filterService} from './_services/filter.service'


// Layout elements
import Nav from './Components/Nav';
import Login from './Components/Login';
import PepparList from './Components/PepparList';
// Loader
import Loader from './Components/Loader';


class App extends Component {
    
    constructor(props){
        super(props);
        // Defining Central State
        this.state = {
            // Catalogs
            pepparType: [],
            relationType: [],
            // App Status
            isLoggedin: false,
            isLoading: false,
            // Peppars and Relations
            myPeppars: [ ],
            myRelations: [ ],
            // Derived Peppars and Relations
            mePeppar: {},
            myEntityRelations: [],
            // Selections
            selectedEntityRelation : {},
        }
        // Making functions available
        this.ModifyState = this.ModifyState.bind(this);
        this.getState = this.getState.bind(this);
    }

    // Callback function to manipulate state
    ModifyState(stateobj) {
        this.setState(stateobj)
    }

    // Callback function to get state properties
    getState(state_prop) {
        return this.state[state_prop]
    }
    
    // Layouts
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
                getState={this.getState}
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
    
    render() {        
        return (
            <div>
                <Nav
                    isLoggedin={this.state.isLoggedin}
                    mePeppar={this.state.mePeppar}
                    myEntityRelations={this.state.myEntityRelations}
                    ModifyState={this.ModifyState}
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