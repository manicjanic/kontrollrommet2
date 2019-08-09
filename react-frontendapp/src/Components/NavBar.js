import React, { useState, useEffect, useRef  } from 'react';
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import {filterService} from '../_services/filter-service'
import {cssModifier} from '../_helpers/css-modifier'

const NavBar = (props) => {

    // Static data for display
    const menu = [ 
        {text: "Dashboard", status: "disabled", path: "/dashboard" },
        {text: "Meetings", status: "disabled", path: "/meetings"},
        {text: "Login", status: "enabled", path: "/login"},
        {text: "Logout", status: "hidden", path: "/logout"},   
    ]

    const menustatus_loggedout = [
        "disabled",
        "disabled",
        "enabled",
        "hidden"
    ]

    const menustatus_loggedin = [
        "enabled", 
        "enabled",                 
        "hidden", 
        "enabled"
    ]

    // Defining state. Selected = id from selected in selection menu
    const [menustatus, setMenustatus] = useState(menustatus_loggedout)

    // Effect Hook that executes when 'selected' changes
    useEffect(() => {
        console.log("running useEffect in NavBar")
        checkifLoggedIn()
    },
        [props.is_Loggedin]
    );
    
    // Event Handler - Sets state on changes to selection menu
    const onSelectEntityRelation = e => {
        let selected_relation = filterService.findOnId(+e.target.value, props.my_Entity_Relations)
        console.log("found selected relation:", selected_relation)
        props.modifyState({selected_Entity_Relation: selected_relation})
    }        
    
    // Checks prop and sets menu based on status
    const checkifLoggedIn = () => {
        if (props.is_Loggedin) {
            setMenustatus(menustatus_loggedin)
        }
        else
            setMenustatus(menustatus_loggedout)
    }
    
    // Greeting element
    const Greeting = (props) => {
        if (props.me_Peppar.peppar_name) {
            return ("Hello, " + props.me_Peppar.peppar_name + ". You are currently representing")
        }
        return ""
    }

    // Representation choice element
    const RepresentationDropdown = (props) => {
        if (props.dropdown_content.length) {
            return (
                <span className="navbar-text">         
                    <select className="custom-select" value={props.selected.id} onChange={onSelectEntityRelation}>
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
        return (
            <option value={props.item.id}>
                {props.item.pepparB.peppar_name} as {props.item.relation_type.name}
            </option>
        )    
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
