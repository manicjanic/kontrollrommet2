import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap'

import {Nav, Navbar} from 'react-bootstrap'
// Not currently in use, unsure if it is needed to make the Routing in React work
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
            return (<span>Hello, {props.me_Peppar.peppar_name}. </span>)
        }
        return ""
    }

    // Representation choice element
    const RepresentationDropdown = (props) => {
        if (props.dropdown_content.length) {
            return (
                <span>
                    Your are currently representing      
                    <div>
                        <select className="custom-select" value={props.selected.id} onChange={onSelectEntityRelation}>
                            {props.dropdown_content.map(item =>
                                <RepresentationDropdownItem item={item} key={item.id} />
                            )}
                        </select>
                    </div>
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
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Kontrollrommet</Navbar.Brand>
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
            <Navbar.Text>
                <Greeting me_Peppar={props.me_Peppar}/>
                <RepresentationDropdown 
                    dropdown_content={props.my_Entity_Relations}
                    selected={props.selected_Entity_Relation}
                />
            </Navbar.Text>
        </Navbar>
    )   
};

export default NavBar;
