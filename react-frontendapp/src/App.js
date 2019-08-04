import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react';
import { Route } from "react-router";
import { PrivateRoute } from './_components';

import {filterService} from './_services/filter-service'


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
            peppar_Types: [],
            relation_Types: [],
            // App Status
            is_Loggedin: false,
            is_Loggedin: false,
            // Peppars and Relations
            all_Peppars: [ ],
            all_Relations: [ ],
            // Derived Peppars and Relations
            me_Peppar: {},
            my_Entity_Relations: [],
            // Selections
            selected_Entity_Relation : {},
        }
        // Making functions available
        this.modifyState = this.modifyState.bind(this);
        this.getState = this.getState.bind(this);
    }

    // Callback function to manipulate state
    modifyState(stateobj) {
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
            modifyState={this.modifyState}
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
                all_Peppars={this.state.all_Peppars}
                modifyState={this.modifyState}
        />
    </div>
    );
    
    LoaderSetup = () => (
        <div>
            <Loader
                modifyState={this.modifyState}
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
                    is_Loggedin={this.state.is_Loggedin}
                    me_Peppar={this.state.me_Peppar}
                    my_Entity_Relations={this.state.my_Entity_Relations}
                    modifyState={this.modifyState}
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