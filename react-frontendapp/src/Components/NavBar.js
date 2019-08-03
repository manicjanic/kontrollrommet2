import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import {CSSModifier} from '../_helpers/CSS-modifier'

const NavBar = (props) => {
    // Defining state. Selected = id from selected in selection menu
    const [selected, setSelected] = useState(0)
    
    // Effect Hook that executes when 'selected' changes
    useEffect(() => {
        props.doSelectEntity(props.myEntityRelations.find(relation => relation.id == selected))    
    }, [selected]);

    // Set state on changes to selection menu
    const onChangeSelect = e => {
        setSelected(+e.target.value)
    }        
    
    // Greeting element, controlled by mePeppar data  
    const Greeting = (props) => {
        if (props.mePeppar.peppar_name) {
            return ("Hello, " + props.mePeppar.peppar_name + ". You are currently representing")
        }
        return ""
    }

    // Representation choice element, passing 
    const RepresentationDropdown = (props) => {
        if (props.dropdown_content.length) {
            return (
                <span className="navbar-text">         
                    <select className="custom-select" value={selected} onChange={onChangeSelect}>
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
        return <option value={props.item.id}>{props.item.pepparB.name} as {props.item.typeobj.name}</option>
    }

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">Kontrollrommet</NavLink>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className={CSSModifier("nav-link", props.menudata[0].status)} to={props.menudata[0].path}>{props.menudata[0].text}</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={CSSModifier("nav-link", props.menudata[1].status)} to={props.menudata[1].path}>{props.menudata[1].text}</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={CSSModifier("nav-link", props.menudata[2].status)} to={props.menudata[2].path}>{props.menudata[2].text}</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={CSSModifier("nav-link", props.menudata[3].status)} to={props.menudata[3].path}>{props.menudata[3].text}</NavLink>
                    </li>
                </ul>
                <span className="navbar-text">
                    <Greeting mePeppar={props.mePeppar}/>
                    <br/>
                    <RepresentationDropdown dropdown_content={props.myEntityRelations}/>
                </span>
            </nav>
        </div>
    )   
};

export default NavBar;
