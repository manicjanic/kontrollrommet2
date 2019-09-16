// React Modules
import React, { Component } from 'react';
import { Route } from "react-router-dom";
// React Bootstrap elements
import {Container, Alert, Button} from 'react-bootstrap'
// Helpers and Services
import {dataService} from '../_services/data-service'
// Mode Components
import NewUserMode from "../Modes/login/new-user-mode";
// Specific Components
import LoginForm from '../Components/login-form'

// Login Page Component
export default class LoginPage extends Component { 
    // Page State
    state = {
        // Page Status
        is_error: false,
        error_message: ""
    }
    
    // Universal Event Handler for Page Level clicks
    handlePageLevelClick = (e) => {
        const {id, value} = e.target
        console.log("Clicked", id)
        switch (id) {
            case ("createnewuser-button"):
                this.props.history.push('/login/createuser')
                break;
            default:
                // no option
        }

    }

    // Universal Event Handler for Child Component Event
    handleChildLevelEvent = (componentevent) => {
        const {componentid, action, data} = componentevent
        console.log("Receiving event" ,componentid, action, data)
        switch (componentid) {
            case ("login-form"):
                this.attemptLogin(data)
                break;
            default:
                // no option
        }
    }

    // Routine for async Login Attempt, passes formdata to data service, receives responseobj
    attemptLogin = async (formdata) => {
        const {username, password} = formdata
        // Call dataservice to process login data
        const responseobj = await dataService.postLogin(username, password)
        // Handle Bad Response
        if (responseobj.error) {
            this.setState({
                is_error: true,
                error_message: responseobj.data.errortext, 
            })
        }
        //Handle successful response
        if (!responseobj.error) {
            localStorage.setItem('userobj', JSON.stringify(responseobj.data));
            this.props.alterState({is_loggedin: true})
            this.props.history.push('/loader')
        }
    }
    
    // JSX-Element
    renderLoginForm = () => (
        <LoginForm 
            handleEvent={this.handleChildLevelEvent}
        />
    )

    // JSX-Element
    renderAlertMessage = () => (
        <Alert variant="danger">{this.state.error_message}</Alert>
    )

    // JSX-Element
    renderCreateUserButton = () => (
        <Button id="createnewuser-button" variant="success" onClick={this.handlePageLevelClick}>Create New User</Button>
    )
    
    // BYPASS FOR TESTING ONLY! //
    renderBypass = () => {
        console.log("Doing bypass of login...")
        this.props.alterState({is_loggedin: true})
        this.props.history.push('/loader')
        return ""
    }

    render() {
        return (
            <Container className="login-container">
                <Route exact path="/login" component={() => (
                    <div className="login-mode">
                        {this.renderLoginForm()}   
                        {this.state.is_error? this.renderAlertMessage() : ""}
                        {this.renderCreateUserButton()}                     
                    </div>
                )}/>
                <Route exact path="/login/createuser" component={(props) => (
                    <div>
                        <NewUserMode className="newuser-mode" {...props}/>
                    </div>
                )}/>
            </Container>
    );
    }
}

// Activate login
//                     {this.renderLoginForm()}                    
//                      {this.renderBypass()}                        