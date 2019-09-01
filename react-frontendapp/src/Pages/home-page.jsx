import React, { Component } from 'react';
import {Container} from 'react-bootstrap'

export default class HomePage extends Component {

    renderWelcomeanonomous() {
        return (
            <div>
                Welcome to Kontrollrommet.
                Please Log in or create user to take control.
            </div>
        )
    }

    renderWelcomeuser() {
        return (
            <div>
                You are now logged in to Kontrollrommet.
                Choose how to take control.
            </div>
        )
    }

    render() {
        let {is_loggedin} = this.props   
        return (
            <div>
                <Container className="homepage-content">
                    {is_loggedin? this.renderWelcomeuser() : this.renderWelcomeanonomous()}
                </Container>
            </div>
        )
    }
}
