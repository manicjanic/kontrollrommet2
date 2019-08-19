import React, { Component } from 'react';

export default class HomePage extends Component {

    welcomeanonomous() {
        return (
            <div>
                Welcome to Kontrollrommet.
                Please Log in or create user to take control.
            </div>
        )
    }

    welcomeuser() {
        return (
            <div>
                You are now logged in to Kontrollrommet.
                Choose how to take control.
            </div>
        )
    }

    render() {  
        if (this.props.is_loggedin) {
            return <div>{this.welcomeuser()}</div>
        }
        else {
            return <div>{this.welcomeanonomous()}</div>
        }
        
    }
}
