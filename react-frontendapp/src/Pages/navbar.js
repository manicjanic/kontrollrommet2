import React, { Component } from 'react';
import { Navbar as BootNavbar} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import NavbarMenu from '../Components/navbar-menu'
import NavbarUserdropdown from '../Components/navbar-userdropdown'

export default class Navbar extends Component {
    
    changeDropdownSelection = (e) => {
        let selected = this.props.user_representations.find(user_representation => 
            e.target.value === user_representation.value
        )
        this.props.modifyState({selected_representation: selected}) 
    }

    // Make derived data from State and construct dropdown content
    makeDropdownContent = () => {
            let menuobjlist = []
            this.props.user_representations.forEach(user_representation  => {
                menuobjlist.push({
                    text: user_representation.organization + " as " + user_representation.userrole,
                    value: user_representation.value
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
                        menuobjlist={this.makeDropdownContent()}
                        selected_representation={this.props.selected_representation}
                        changeDropdownSelection={this.changeDropdownSelection}
                        />
                </BootNavbar>
            </div>
        )
    }
}
