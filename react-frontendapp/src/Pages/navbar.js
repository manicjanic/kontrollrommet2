import React, { Component } from 'react';
import { Navbar as BootNavbar} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import NavbarMenu from '../Components/navbar-menu'
import NavbarUserdropdown from '../Components/navbar-userdropdown'

export default class Navbar extends Component {
    
    // Make derived data from State and construct dropdown content
    makeDropdownContent = () => {
            let menuobj_list = []
            this.props.user_representations.forEach(user_representation  => {
                let menuobj = {}
                menuobj.text = user_representation.organization + " as " + user_representation.userrole
                menuobj.value = user_representation.value
                menuobj_list.push(menuobj)   
            });
        return menuobj_list
    }

    // Callback for handling changes in User Representation Dropdown
    changeDropdownSelection = (e) => {
        let selected = this.props.user_representations.find(user_representation => 
            e.target.value === user_representation.value
        )
        this.props.modifyState({selected_representation: selected}) 
    }

    render() {
        return (
            <div>
                <BootNavbar bg="light" expand="lg">
                    <LinkContainer to="/">
                    <BootNavbar.Brand>Kontrollrommet</BootNavbar.Brand>
                    </LinkContainer>
                    <NavbarMenu
                         is_loggedin={this.props.is_loggedin}
                    />
                    
                    <NavbarUserdropdown 
                        is_loggedin={this.props.is_loggedin}
                        userpacov={this.props.userpacov}
                        menuobjlist={this.makeDropdownContent()}
                        selected_representation={this.props.selected_representation}
                        changeDropdownSelection={this.changeDropdownSelection}
                        />
                </BootNavbar>
            </div>
        )
    }
}
