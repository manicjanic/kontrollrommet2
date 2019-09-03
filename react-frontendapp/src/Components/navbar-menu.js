import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import {Nav} from 'react-bootstrap'

import {cssModifier} from '../_helpers/css-modifier'

const NavbarMenu = (props) => {

    // Static data for Menu
    const MENU = [ 
        {text: "Dashboard", path: "/dashboard" },
        {text: "Meetings", path: "/meetings"},
        {text: "Login", path: "/login"},
        {text: "Logout", path: "/logout"},   
    ]

    // Preset for Menu status
    const MENUSTATUS_LOGGEDOUT = [
        "disabled",
        "disabled",
        "enabled",
        "hidden"
    ]

    // Preset for Menu status
    const MENUSTATUS_LOGGEDIN = [
        "enabled", 
        "enabled",                 
        "hidden", 
        "enabled"
    ]

    // Defining state. Selected = id from selected in selection menu
    const [menustatus, setMenustatus] = useState(MENUSTATUS_LOGGEDOUT)
    
    // Effect Hook that executes a function when prop 'logged_in' changes.
    useEffect( () => { onChangeLoggedIn() },
        [props.is_loggedin]
    );
    
    // When Checks prop and sets menu based on status
    const onChangeLoggedIn = () => {
        props.is_loggedin? setMenustatus(MENUSTATUS_LOGGEDIN) : setMenustatus(MENUSTATUS_LOGGEDOUT)
    }
    
    return (
        <Nav className="mr-auto">
            <LinkContainer to={MENU[0].path}>
            <Nav.Link className={cssModifier("", menustatus[0])}>{MENU[0].text}</Nav.Link>
            </LinkContainer>
            <LinkContainer to={MENU[1].path}>
            <Nav.Link className={cssModifier("", menustatus[1])}>{MENU[1].text}</Nav.Link>
            </LinkContainer>
            <LinkContainer to={MENU[2].path}>
            <Nav.Link className={cssModifier("", menustatus[2])}>{MENU[2].text}</Nav.Link>
            </LinkContainer>
            <LinkContainer to={MENU[3].path}>
            <Nav.Link className={cssModifier("", menustatus[3])}>{MENU[3].text}</Nav.Link>
            </LinkContainer>
        </Nav>
    )   
};

export default NavbarMenu