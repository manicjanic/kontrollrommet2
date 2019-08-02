import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import {CSSModifier} from '../_helpers/CSS-modifier'

const NavBar = (props) => {
    
    const Greeting = (props) => {
        if (props.mePeppar.peppar_name) {
            return ("Hello, " + props.mePeppar.peppar_name + ". You are currently representing")
        }
        return ""
    }

    const RepresentationDropdown = (props) => {
        let myEntityRelations = props.myEntityRelations()
        if (myEntityRelations.length) {
            return (
                <span className="navbar-text">         
                    <select className="custom-select">
                        {myEntityRelations.map(function(_item, i) {
                        return <RepresentationDropdownItem item={_item} key={i} />
                        })}
                    </select>                                    
                </span>
            )
        }
        return ""
    }

    const RepresentationDropdownItem = (props) => {
        return <option>{props.item.pepparB.name} as {props.item.typeobj.name}</option>
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
                    <RepresentationDropdown myEntityRelations={props.myEntityRelations}/>
                </span>
            </nav>
        </div>
    )   
};

export default NavBar;
