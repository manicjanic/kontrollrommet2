import React, { Component } from 'react';

export default class LogoutPage extends Component {
    
    // Initial operations
    componentDidMount() {
        this.doLogout();
    }
    
    // Async Login rutine, returns responseobj
    doLogout = () => {
        this.props.modifyState({is_loggedin: false})
        localStorage.removeItem('userobj');
        this.props.history.push('/')
    }
        
    render() {
        return (
            <div>Logged Out</div>     
        );
    }
}