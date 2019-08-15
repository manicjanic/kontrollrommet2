import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react';
import { Route, Switch } from "react-router";
import { PrivateRoute } from './_components';

// Layout elements
import Navigator from './Components/Nav';
import Login from './Components/Login';
import Meetings from "./Components/Meetings";

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
            // Peppars and Relations
            all_Peppars: [ ],
            all_Relations: [ ],
            // Derived Peppars and Relations
            me_Peppar: {},
            my_Peppars: [],
            my_Relations: [],
            // Created Peppars and Relations
            new_Peppars: [],
            new_Relations: [],
            // Selections to be available globally
            selected_Entity_Relation : {},
        }
        // Making functions available
        this.modifyState = this.modifyState.bind(this);
        this.getState = this.getState.bind(this);
    }

    // Callback function to manipulate state
    // stateobj = object consisting of key and value to be set
    modifyState(stateobj) {
        this.setState(stateobj)
    }

    // Callback function to get state value
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
            This is the Home page of Kontrollrommet. 
        </div>
    );

    MeetingsSetup = () => (
        <div>
            <Meetings
                    all_Relations={this.state.all_Relations}
                    all_Peppars={this.state.all_Peppars}
                    my_Relations={this.state.my_Relations}
                    my_Peppars={this.state.my_Peppars}
                    modifyState={this.modifyState}
                    getState={this.getState}
            />
        </div>
    );
                
    DashboardSetup = () => (
        <div>
            This is the Dashboard. Main control mastered from here.
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
                <Navigator
                    is_Loggedin={this.state.is_Loggedin}
                    me_Peppar={this.state.me_Peppar}
                    my_Relations={this.state.my_Relations}
                    selected_Entity_Relation={this.state.selected_Entity_Relation}
                    modifyState={this.modifyState}
                />
                <Switch>
                    <Route path="/" exact = {true} render = {this.HomeSetup}/>
                    <Route path="/login" exact = {true} render = {this.LoginSetup}/>
                    <Route path="/logout" exact = {true} render = {this.LoginSetup}/>
                    <PrivateRoute path="/meetings/" component={this.MeetingsSetup} />
                    <PrivateRoute exact path="/dashboard" component={this.DashboardSetup} />
                    <PrivateRoute exact path="/loader" component={this.LoaderSetup}/>
                </Switch>
            </div>
        )
    }
}

export default App;