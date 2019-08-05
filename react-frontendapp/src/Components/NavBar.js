import React, { useState, useEffect, useRef  } from 'react';
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import {cssModifier} from '../_helpers/css-modifier'

const NavBar = (props) => {

    // 
    const menu = [ 
        {text: "Dashboard", status: "disabled", path: "/dashboard" },
        {text: "Meetings", status: "disabled", path: "/meetings"},
        {text: "Login", status: "enabled", path: "/login"},
        {text: "Logout", status: "hidden", path: "/logout"},   
    ]

    // Defining state. Selected = id from selected in selection menu
    const [menustatus, setMenustatus] = useState([
        "disabled",
        "disabled",
        "enabled",
        "hidden"
    ])
    const inputRef = useRef()

    // Effect Hook that executes when 'selected' changes
    useEffect(() => {
        console.log("running useeffect in navBar")
        onLoggedIn()
    },
        [inputRef, props.selected_Entity_Relation, props.is_Loggedin, props.my_Entity_Relations]
    );
    
    // Set state on changes to selection menu
    const onChangeSelect = e => {
        props.modifyState({selected_Entity_Relation: props.my_Entity_Relations.find(relation => relation.id == +e.target.value)})
    }        
    
    const onLoggedIn = () => {
        if (props.is_Loggedin) {
            setMenustatus([
                "enabled", 
                "enabled",                 
                "hidden", 
                "enabled"
            ])
        }
        else
            setMenustatus([
                "disabled",
                "disabled",
                "enabled",
                "hidden"
            ])
    }
    // Greeting element, controlled by me_Peppar data  
    const Greeting = (props) => {
        if (props.me_Peppar.peppar_name) {
            return ("Hello, " + props.me_Peppar.peppar_name + ". You are currently representing")
        }
        return ""
    }

    // Representation choice element, passing 
    const RepresentationDropdown = (props) => {
        if (props.dropdown_content.length) {
            return (
                <span className="navbar-text">         
                    <select ref={inputRef} className="custom-select" value={props.selected.id} onChange={onChangeSelect}>
                        {props.dropdown_content.map(function(item, i) {
                        return <RepresentationDropdownItem item={item} key={item.id} />
                        })}
                    </select>                                    
                </span>
            )
        }
        return ""
    }

    const RepresentationDropdownItem = (props) => {
        return <option value={props.item.id}>{props.item.pepparB.peppar_name} as {props.item.relation_type.name}</option>
    }

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">Kontrollrommet</NavLink>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className={cssModifier("nav-link", menustatus[0])} to={menu[0].path}>{menu[0].text}</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={cssModifier("nav-link", menustatus[1])} to={menu[1].path}>{menu[1].text}</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={cssModifier("nav-link", menustatus[2])} to={menu[2].path}>{menu[2].text}</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={cssModifier("nav-link", menustatus[3])} to={menu[3].path}>{menu[3].text}</NavLink>
                    </li>
                </ul>
                <span className="navbar-text">
                    <Greeting me_Peppar={props.me_Peppar}/>
                    <br/>
                    <RepresentationDropdown 
                        dropdown_content={props.my_Entity_Relations}
                        selected={props.selected_Entity_Relation}
                    />
                </span>
            </nav>
        </div>
    )   
};

export default NavBar;
