import React, { Component } from 'react';
import { Route } from "react-router-dom";

// Frontend Database
import DB from './db'
// Authorized routes with token
import { PrivateRoute } from './_components';

// Navbar
import Navbar from './Pages/navbar'

// Full Page Components
import HomePage from './Pages/home-page'
import LoginPage from './Pages/login-page'
import LogoutPage from './Pages/logout-page'
import LoaderPage from './Pages/loader-page'

import MeetingsPage from './Pages/meetings-page'

import ListPacovsPage from './Pages/listpacovs-page'
import ShowPacovPage from './Pages/showpacov-page'

class App extends Component {

    // Defining Central State
    state = {
        db: new DB('pacovbase'),
        category: {},
        relationtype: {},
        pacovs: {},
        relations: {},
        
        loading: false,
        is_loggedin: false,
        
        userpacov: {},
        user_representations: [],
        selected_representation: {}
    }

    // Callback function to manipulate state
    // stateobj = object consisting of key and value to be set
    modifyState = (stateobj) => {
        this.setState(stateobj)
    }

    // Callback function to get state value
    getState = (state_prop) => {
        return this.state[state_prop]
    }
        
    showContent = () => {
        if (this.state.loading) {
            return <div>Loading...</div>
        }
        return (  
            <div className="screen-content">
                <Route exact path='/' component={(props) => <HomePage {...props} is_loggedin={this.state.is_loggedin}/>}/>
                <Route exact path='/login' component={(props) => <LoginPage {...props} modifyState={this.modifyState}/>}/>
                <Route exact path='/logout' component={(props) => <LogoutPage {...props} modifyState={this.modifyState}/>}/>
                <PrivateRoute exact path='/loader' component={(props) => <LoaderPage {...props} modifyState={this.modifyState}/>}/>
                <PrivateRoute path='/meetings' component={(props) => 
                    <MeetingsPage {...props} 
                        pacovs={this.state.pacovs}
                        relations={this.state.relations}
                        schemes={this.state.defaultschemes}
                    />
                }/>
                <Route exact path='/pacovs' component={(props) => <ListPacovsPage {...props} pacovs={this.state.pacovs}/>}/>
                <Route exact path='/pacovs/:id' component={(props) => <ShowPacovPage {...props} pacov={this.state.pacovs[props.match.params.id]}/>}/>
            </div>
        )
    }
    render() {
        return (
            <div className="App">
                <Navbar 
                    is_loggedin={this.state.is_loggedin} 
                    userpacov={this.state.userpacov}
                    user_representations={this.state.user_representations}
                    selected_representation={this.state.selected_representation}
                    modifyState={this.modifyState}
                />
                {this.showContent()}
            </div>
        )
    }
}

export default App;