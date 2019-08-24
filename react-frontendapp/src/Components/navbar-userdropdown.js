import React from 'react';
import { Navbar } from 'react-bootstrap'

const NavbarUserdropdown = (props) => {
    
    // Greeting element
    const Greeting = (props) => {
        if (props.userpacov.name) {
            return (<span>Hello, {props.userpacov.name}. </span>)
        }
        return ""
    }

    // Dropdown element
    const Dropdown = (props) => {
        if (props.menuobjlist.length) {
            const menuobjlist = props.menuobjlist        
            return (
                <span> 
                    Your are currently representing
                    <div>
                        <select value={props.selected_representation.value} onChange={props.changeDropdownSelection}>
                                <DropdownList menuobjlist={menuobjlist}/>
                        </select>
                    </div>
                </span>
            )
        }
        return ""
    }

    // List element
    const DropdownList = (props) => {
        const dropdown = props.menuobjlist.map(item => {
            return(
                <option value={item.value} key={item.value}>
                    {item.text}
                </option>
            )
        })
        return dropdown
    }

    return (
            <Navbar.Text>
                <Greeting userpacov={props.userpacov}/>
                <Dropdown 
                    menuobjlist={props.menuobjlist}
                    selected_representation={props.selected_representation}
                    changeDropdownSelection={props.changeDropdownSelection}
                />
            </Navbar.Text>
    )   
};

export default NavbarUserdropdown;
