import React, { Component } from 'react';
import { Navbar as BootNavbar} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import {filterService} from '../_services/filter-service'

import NavbarMenu from '../Components/navbar-menu'
import NavbarUserdropdown from '../Components/navbar-userdropdown'

export default class Navbar extends Component {
    
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
                        user_functions={this.props.user_functions}
                        selected_function={this.props.selected_function}
                        />
                </BootNavbar>
            </div>
        )
    }
}
