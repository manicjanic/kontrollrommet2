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
            // App Status
            isLoggedin: false,
            isLoading: false,
            // Peppars and Relations
            mePeppar: {},
            myPeppars: [ ],
            myRelations: [ ],
            // Catalogs
            pepparType: [],
            relationType: []
        }
        // Making functions available
        this.ModifyState = this.ModifyState.bind(this);
        this.myEntityRelations = this.myEntityRelations.bind(this);
    }

    // Callback functions to manipulate state
    ModifyState(statekey, statevalue) {
        this.setState({[statekey] : statevalue})
    }
    
    // Callback function to derive Relations for specific use
    myEntityRelations() {
        return filterService.get_specified_myrelations(this.state.mePeppar, this.state.myRelations, "ENTITY")
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
    
    render() {        
        return (
            <div>
                <Nav
                    isLoggedin={this.state.isLoggedin}
                    mePeppar={this.state.mePeppar}
                    myEntityRelations={this.myEntityRelations}
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