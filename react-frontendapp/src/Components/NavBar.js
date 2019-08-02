import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import {CSSModifier} from '../_helpers/CSS-modifier'

const NavBar = (props) => {
    // Defining state. Selected id from dropdown and array of objects
    const [selected, setSelected] = useState(0)
    // const [myEntityRelations, setMyEntityRelations] = useState(props.myEntityRelations())

//    useEffect(() => {
//        console.log("running useeffect")
//        setMyEntityRelations(props.myEntityRelations());
//    }, [])
 
    const onChangeSelect = e => {
        setSelected(+e.target.value)
        console.log("selected", (selected), props.myEntityRelations, props.myEntityRelations[selected])
        props.doSelectEntity(props.myEntityRelations[(selected)])
    }
    const Greeting = (props) => {
        if (props.mePeppar.peppar_name) {
            return ("Hello, " + props.mePeppar.peppar_name + ". You are currently representing")
        }
        return ""
    }

    const RepresentationDropdown = (props) => {
        console.log("in the dropdown", props.dropdown_content)
        console.log("state myER", props.myEntityRelations)
        if (props.dropdown_content.length) {
            return (
                <span className="navbar-text">         
                    <select className="custom-select" value={selected} onChange={onChangeSelect}>
                        {props.dropdown_content.map(function(item, i) {
                            console.log("inside map", i, item.uiid)
                        return <RepresentationDropdownItem item={item} id={i} key={item.uuid} />
                        })}
                    </select>                                    
                </span>
            )
        }
        return ""
    }

    const RepresentationDropdownItem = (props) => {
        return <option value={props.id}>{props.item.pepparB.name} as {props.item.typeobj.name}</option>
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
