import React, { Component } from 'react';
import { Navbar as BootNavbar} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import NavbarMenu from '../Components/navbar-menu'
import NavbarUserdropdown from '../Components/navbar-userdropdown'

export default class Navbar extends Component {
    
    changeDropdownSelection = (e) => {
        let selected = this.props.user_functions.find(user_function => 
            e.target.value === user_function.value
        )
        this.props.modifyState({selected_function: selected}) 
    }

    makeDropdownMenu = () => {
            let menuobjlist = []
            this.props.user_functions.forEach(userfunction  => {
                menuobjlist.push({
                    text: userfunction.organization + " as " + userfunction.userfunction,
                    value: userfunction.value
                })   
            });
        return menuobjlist
    }

    render() {
        return (
            <div>
                <BootNavbar bg="light" expand="lg">
                    <LinkContainer to="/">
                    <BootNavbar.Brand>Kontrollrommet</BootNavbar.Brand>
                    </LinkContainer>
                    <NavbarMenu is_loggedin={this.props.is_loggedin}/>
                    <NavbarUserdropdown 
                        is_loggedin={this.props.is_loggedin}
                        userpacov={this.props.userpacov}
                        menuobjlist={this.makeDropdownMenu()}
                        selected_function={this.props.selected_function}
                        changeDropdownSelection={this.changeDropdownSelection}
                        />
                </BootNavbar>
            </div>
        )
    }
}
