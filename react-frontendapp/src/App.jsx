import React, { Component } from 'react';
import { Route } from "react-router-dom";

// Frontend Database
import DB from './db'
// Authorized routes with token
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

    // Defining Central State
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
        // Derivatives for Application use
        userpacov: {},
        user_roles: [],
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
                userpacov={this.state.userpacov}
                category={this.state.category}
            />}/>
        </div>
    )
    
    // JSX-Element
    renderNavbar = () => (
        <div>
            <Navbar 
                is_loggedin={this.state.is_loggedin} 
                userpacov={this.state.userpacov}
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