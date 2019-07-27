import React from 'react';
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = (props) => {
    // Set function state to use for menu
    let Menu = [
        {id:1, text: "Dashboard", disabled: true, hidden: false, path: "/dashboard" },
        {id:2, text: "Meetings", disabled: true, hidden: false, path: "/meetings"},
        {id:3, text: "Login", disabled: false, hidden: false, path: "/login"},
        {id:4, text: "Logout", disabled: true, hidden: true, path: "/logout"},   
    ]

    const MenuItem = (props) => {
        return (
            <li className="nav-item">
                <NavLink className={props.cn} to={props.item.path}>{props.item.text}</NavLink>
            </li>
        )    
    }

    const MenuMaker = (props) => {
        
        if (props.isLoggedin) {
            Menu[0].disabled=false
            Menu[1].disabled=false
            Menu[2].disabled=true
            Menu[3].disabled=false
            Menu[2].hidden=true
            Menu[3].hidden=false
        }
    
        return Menu.map(function(_item, i){
            let _classname = "nav-link"
            if (_item.disabled) {
                _classname += " disabled"
            } 
            if (_item.hidden) {
                _classname += " d-none"
            }
            return <MenuItem item={_item} cn={_classname} key={i} />;              
        })
    }
    
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">Kontrollrommet</NavLink>
                <ul className="navbar-nav mr-auto">
                    <MenuMaker isLoggedin={props.isLoggedin}/>
                </ul>
                <span className="navbar-text">Welcome, {props.userdata.firstname}</span>
            </nav>
        </div>
    )   
};

export default NavBar;
