import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";


class NavBar extends Component {

    constructor(props){
        super(props);
        // Bind the functions
        this.htmlAdder = this.htmlAdder.bind(this);
        this.htmlSwitcher = this.htmlSwitcher.bind(this);
    }
    
    // adds an element (_addon) to an existing html element (_classname), if given the truth (_truth)
    htmlAdder(_text, _addon, _truth) {
        let text = _text;
        if (_truth) {
            text += (" " + _addon)
        }
        return text
    }
    // toggles between two elements (_truetext, _falsetext) based on the truth (_truth)
    htmlSwitcher(_truetext, _falsetext, _truth) {
        var text
        if (_truth) {
            text= _truetext
        }
        else text = _falsetext
        return text
    }

    render () {
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <NavLink className="navbar-brand" to="/">Kontrollrommet</NavLink>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className={this.htmlAdder("nav-link", "disabled", !this.props.isLoggedin)} to="/dashboard">Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={this.htmlAdder("nav-link", "disabled", !this.props.isLoggedin)} to="/meetings">Meetings</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">{this.htmlSwitcher("Logout", "Login", this.props.isLoggedin)}</NavLink>
                        </li>
                    </ul>
                    <span className="navbar-text">Welcome, {this.props.userdata.firstname}</span>
                </nav>
            </div>
        )
    }
};

export default NavBar;
