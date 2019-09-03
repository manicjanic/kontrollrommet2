import React, { Component } from 'react';
import {Container} from 'react-bootstrap'
import {Alert} from 'react-bootstrap'

import {dataService} from '../_services/data-service'

import LoginForm from '../Components/login-form'

export default class LoginPage extends Component {

    state = {
        formdata: {},
        error: false,
        errormessage: undefined
    }

    // Async Login rutine, returns responseobj
    attemptLogin = async (e) => {
        e.preventDefault();
        const {username, password} = this.state.formdata
        // Call dataservice to process login data
        const responseobj = await dataService.postLogin(username, password)
        let errormessage = ""
        //If successfull response
        if (!responseobj.error) {
            localStorage.setItem('userobj', JSON.stringify(responseobj.data));
            this.props.alterState({is_loggedin: true})
            this.props.history.push('/loader')
        }
        // Handle Bad Response
        if (responseobj.error) {
            console.log("error in login", responseobj.status, responseobj.data[0])
            if (responseobj.data[0] === "Wrong Credentials") {
                errormessage = "Feil brukernavn/passord"
            }
        }
        this.setState({
            errormessage: errormessage, 
            error: true,
            formdata: {username: "", password: ""}
        })     

    }

    // Function for handling changes in form
    updateValue = (e) => {
        let formdata = this.state.formdata
        formdata[e.target.name] = e.target.value
        this.setState({formdata: formdata})    
    }
        
    // JSX-Element
    renderLoginForm = () => (
        <LoginForm 
            handleSubmit={this.attemptLogin}
            updateValue={this.updateValue}
            formdata={this.state.formdata}
        />
    )

    // Layout element, active on prop
    renderAlertMessage = () => {
        return <Alert variant="danger">{this.state.errormessage}</Alert>
    }
    
    render() {
        return (
            <div>
                <Container className="loginpage-content">    
                    {this.renderLoginForm()}                    
                    {this.state.error? this.renderAlertMessage() : ""} 
                </Container>
            </div>
        );
    }
}