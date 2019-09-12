import React, { Component } from 'react';

export default class LogoutPage extends Component {
    
    // Initial operations
    componentDidMount() {
        this.doLogout();
    }
    
    // Logout Routine
    doLogout = () => {
        this.props.alterState({is_loggedin: false})
        localStorage.removeItem('userobj');
        this.props.alterState({pacovs: {}, relations: {}})
        this.props.history.push('/')
    }
        
    render() {
        return (
            <div>Logged Out</div>     
        );
    }
}