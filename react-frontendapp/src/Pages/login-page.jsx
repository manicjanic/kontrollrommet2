// React Modules
import React, { Component } from 'react';
import { Route } from "react-router-dom";
// React Bootstrap elements
import {Container, Alert, Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
// Helpers and Services
import {dataService} from '../_services/data-service'
// Mode Components
import NewUserMode from "../Modes/login/new-user";
// App Specific Components
import LoginForm from '../Components/login-form'

// Login Page Component
export default class LoginPage extends Component { 
    // Page State
    state = {
        // Page Status
        is_errror: false,
        error_message: ""
    }
    
    // Async rutine for Login Attempt, returns responseobj
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
    renderLoginForm = () => <LoginForm handleSubmit={this.attemptLogin}/>

    // JSX-Element
    renderAlertMessage = () => <Alert variant="danger">{this.state.error_message}</Alert>

    // JSX-Element
    renderCreateUserButton = () => (
        <LinkContainer to="/login/createuser">
            <Button variant="success">Create New User</Button>
        </LinkContainer>
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