import React, { Component } from 'react';
import { Navbar as BootNavbar} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import NavbarMenu from '../Components/navbar-menu'

export default class Navbar extends Component {
    
    render() {
        return (
            <div>
                <BootNavbar bg="light" expand="lg">
                    <LinkContainer to="/">
                    <BootNavbar.Brand>Kontrollrommet</BootNavbar.Brand>
                    </LinkContainer>
                    <NavbarMenu is_loggedin={this.props.is_loggedin}/>
                </BootNavbar>
            </div>
        )
    }
}
