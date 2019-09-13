// React Modules
import React, { Component } from 'react';
import { Route } from "react-router-dom";
// Helpers and Services
import { PrivateRoute } from './_helpers/PrivateRoute';
// Frontend Database (NOT yet in use)
import DB from './db'
// Navbar Component
import Navbar from './Pages/navbar'
// Page Components
import HomePage from './Pages/home-page'
import LoginPage from './Pages/login-page'
import LogoutPage from './Pages/logout-page'
import LoaderPage from './Pages/loader-page'
import MeetingsPage from './Pages/meetings-page'

// Main App Component
class App extends Component {

    // Central State
    state = {
        // Database
        db: new DB('pacovbase'),
        // Pacovs and Relations
        category: {},
        relationtype: {},
        pacovs: {},
        relations: {},
        // User filtered Pacovs and Relations
        user_pacov: {},
        user_roles: {},
        user_ownerships: {},
        // Globan status
        is_loading: false,
        is_loggedin: false,
        // Global Selections
        selected_user_role: {},
    }

    // Callback function to alter state
    alterState = (stateobj) => {
        console.log("Altering State with this object", JSON.parse(JSON.stringify(stateobj)))
        this.setState(stateobj)
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
            <Route path='/login' component={(props) => <LoginPage {...props}
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
                pacovs={this.state.pacovs} 
                user_pacov={this.state.user_pacov}
                user_roles={this.state.user_roles}
                selected_user_role={this.state.selected_user_role}
                alterState={this.alterState}
            />
        </div>
    )

    render() {
        // Grab State
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