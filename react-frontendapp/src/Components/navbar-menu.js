import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import {Nav} from 'react-bootstrap'

import {cssModifier} from '../_helpers/css-modifier'

const NavbarMenu = (props) => {

    // Static data for Menu
    const menu = [ 
        {text: "Dashboard", path: "/dashboard" },
        {text: "Meetings", path: "/meetings"},
        {text: "Login", path: "/login"},
        {text: "Logout", path: "/logout"},   
    ]

    // Preset for Menu status
    const menustatus_loggedout = [
        "disabled",
        "disabled",
        "enabled",
        "hidden"
    ]

    // Preset for Menu status
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
        [props.is_loggedin]
    );
    
    // Checks prop and sets menu based on status
    const checkifLoggedIn = () => {
        if (props.is_loggedin) {
            setMenustatus(menustatus_loggedin)
        }
        else
            setMenustatus(menustatus_loggedout)
    }
    
    return (
        <Nav className="mr-auto">
            <LinkContainer to={menu[0].path}>
            <Nav.Link className={cssModifier("", menustatus[0])}>{menu[0].text}</Nav.Link>
            </LinkContainer>
            <LinkContainer to={menu[1].path}>
            <Nav.Link className={cssModifier("", menustatus[1])}>{menu[1].text}</Nav.Link>
            </LinkContainer>
            <LinkContainer to={menu[2].path}>
            <Nav.Link className={cssModifier("", menustatus[2])}>{menu[2].text}</Nav.Link>
            </LinkContainer>
            <LinkContainer to={menu[3].path}>
            <Nav.Link className={cssModifier("", menustatus[3])}>{menu[3].text}</Nav.Link>
            </LinkContainer>
        </Nav>
    )   
};

export default NavbarMenu