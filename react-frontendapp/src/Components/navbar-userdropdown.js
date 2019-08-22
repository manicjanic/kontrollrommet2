import React, { useState, useEffect } from 'react';
import { Navbar } from 'react-bootstrap'

const NavbarUserdropdown = (props) => {
    
    // Returns list of menuobject with text and value for each choice
    // [{text: "", value: N}]
    const makeDropdownMenu = () => {
        console.log("making menu", props.user_functions)
            let menuobjlist = []
            props.user_functions.forEach((userfunction, index)  => {
                menuobjlist.push({
                    text: userfunction.organization + " as " + userfunction.userfunction,
                    value: userfunction.value
                })   
            });
        return menuobjlist
    }

    // Greeting element
    const Greeting = (props) => {
        if (props.userpacov.name) {
            return (<span>Hello, {props.userpacov.name}. </span>)
        }
        return ""
    }

    // Dropdown element
    const Dropdown = (props) => {
        if (props.user_functions.length) {
            const menuobjlist = makeDropdownMenu()        
            console.log("menuobjlist", menuobjlist)
            return (
                <span> 
                    Your are currently representing
                    <div>
                        <select>
                                <DropdownList menuobjlist={menuobjlist}/>
                        </select>
                    </div>
                </span>
            )
        }
        return ""
    }

    const DropdownList = (props) => {
        const dropdown = props.menuobjlist.map(item => {
            return(
                <option value={item.value}>
                    {item.text}
                </option>
            )
        })
        return dropdown
    }

    return (
            <Navbar.Text>
                <Greeting userpacov={props.userpacov}/>
                <Dropdown user_functions={props.user_functions} />
            </Navbar.Text>
    )   
};

export default NavbarUserdropdown;
