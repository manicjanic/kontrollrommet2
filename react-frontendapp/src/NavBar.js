import React from 'react';
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = (props) => {

    // adds an element (_addon) to an existing html element (_classname), if given the truth (_truth)
    
    
    function MenuMaker() {
        var Menuobjects = [
            {text: "Dashboard", status: "disabled" },
            {text: "Meetings", status: "disabled" },
            {text: "Login", status: "active"},
            {text: "Logout", status: "hidden"},
        ]

        return (
            Menuobjects.map(function(menuitem, i) {
                return (
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/dashboard">{menuitem.text}</NavLink>
                    </li>
                )
            })
        )
    
    } 
    
    function htmlAdder(_text, _addon, _truth) {
    let text = _text;
    if (_truth) {
        text += (" " + _addon)
    }
    return text
}


    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">Kontrollrommet</NavLink>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className={htmlAdder("nav-link", "disabled", !props.isLoggedin)} to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={htmlAdder("nav-link", "disabled", !props.isLoggedin)} to="/meetings">Meetings</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">{htmlSwitcher("Logout", "Login", props.isLoggedin)}</NavLink>
                    </li>
                </ul>
                <span className="navbar-text">Welcome, {props.userdata.firstname}</span>
            </nav>
        </div>
    )   
};

    // adds an element (_addon) to an existing html element (_classname), if given the truth (_truth)
function htmlAdder(_text, _addon, _truth) {
        let text = _text;
        if (_truth) {
            text += (" " + _addon)
        }
        return text
    }
    // toggles between two elements (_truetext, _falsetext) based on the truth (_truth)
function htmlSwitcher(_truetext, _falsetext, _truth) {
        var text
        if (_truth) {
            text= _truetext
        }
        else text = _falsetext
        return text
    }

export default NavBar;
