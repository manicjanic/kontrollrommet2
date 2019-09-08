import React, { Component } from 'react';
import { Route } from "react-router-dom";

// Frontend Database (NOT yet in use)
import DB from './db'
// Helper routine to make Authorized routes that demand active usertoken
import { PrivateRoute } from './_helpers/PrivateRoute';
// Navbar
import Navbar from './Pages/navbar'
// Page Components
import HomePage from './Pages/home-page'
import LoginPage from './Pages/login-page'
import LogoutPage from './Pages/logout-page'
import LoaderPage from './Pages/loader-page'
import MeetingsPage from './Pages/meetings-page'

class App extends Component {

    // Set Central State
    state = {
        // Database
        db: new DB('pacovbase'),
        // Catalog Elements
        category: {},
        relationtype: {},
        // Pacovs and Relations
        pacovs: {},
        relations: {},
        // Application status indicators
        is_loading: false,
        is_loggedin: false,
        // Derived data from Pacovs and Relations, to avid unnecessary filter and construction. May contain added data
        // Person-Pacov belonging to user
        user_pacov: {},
        // Lists with expanded relations, connected to user_pacov
        user_roles: [],
        user_ownerships: [],
        // Selection status
        selected_user_role: {}
    }

    // Callback function to manipulate state
    // stateobj = state object to be set
    alterState = (stateobj) => {
        this.setState(stateobj)
    }

    // Callback function to get state value
    getState = (state_prop) => {
        return this.state[state_prop]
    }
    
    // JSX-Element
    renderLoading = () => {
        return <div>Loading...</div>
    }
    
    // JSX-Element
    renderContent = () => (
        // Sets up routes to all page Components
        <div className="app-content">
            <Route exact path='/' component={(props) => <HomePage {...props}
                is_loggedin={this.state.is_loggedin}
            />}/>
            <Route exact path='/login' component={(props) => <LoginPage {...props}
                alterState={this.alterState}
            />}/>
            <Route exact path='/logout' component={(props) => <LogoutPage {...props}
                alterState={this.alterState}
            />}/>
            <PrivateRoute exact path='/loader' component={(props) => <LoaderPage {...props} 
                alterState={this.alterState}
            />}/>
            <PrivateRoute path='/meetings' component={(props) => <MeetingsPage {...props} 
                pacovs={this.state.pacovs}
                relations={this.state.relations}
                user_pacov={this.state.user_pacov}
                category={this.state.category}
                selected_user_role={this.state.selected_user_role}
            />}/>
        </div>
    )
    
    // JSX-Element
    renderNavbar = () => (
        <div>
            <Navbar 
                is_loggedin={this.state.is_loggedin} 
                user_pacov={this.state.user_pacov}
                user_roles={this.state.user_roles}
                selected_user_role={this.state.selected_user_role}
                alterState={this.alterState}
            />
        </div>
    )

    render() {
        const { is_loading } = this.state
        return (
            <div>
                <div className="navbar-content">
                    {this.renderNavbar()}
                </div>
                <div className="app-content">
                    {is_loading? this.renderLoading() : this.renderContent()}
                </div>
            </div>
        )
    }
}

export default App;