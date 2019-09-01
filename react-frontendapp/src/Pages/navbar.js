import React, { Component } from 'react';
import { Navbar as BootNavbar} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import NavbarMenu from '../Components/navbar-menu'
import Dropdown from '../_components/Dropdown'

export default class Navbar extends Component {
    
    // Make derived data from State and construct dropdown content
    makeDropdownContent = () => {
        let menuobj_list = []
        const {user_roles} = this.props
        console.log("user roles", user_roles)
        for (let key in user_roles) {
            let menuobj = {}
            menuobj.text = user_roles[key].collective_entity.name + " as " + user_roles[key].role_type_name
            menuobj.value = key
            menuobj_list.push(menuobj)   
        };
        return menuobj_list
    }

    // Callback for handling changes in User Representation Dropdown
    changeDropdownSelection = (e) => {
        let selected = this.props.user_roles.find(user_role => 
            e.target.value === user_role.value
        )
        this.props.alterState({selected_user_role: selected}) 
    }

    renderLogo = () => (
        <LinkContainer to="/">
            <BootNavbar.Brand>Kontrollrommet</BootNavbar.Brand>
        </LinkContainer>
    )

    renderGreeting = () => {
        const { userpacov } = this.props
        return <span>Hello, {userpacov.name}. You are currently representing</span>
    }

    render() {
        const { is_loggedin } = this.props
        return (
            <div>
                <BootNavbar bg="light" expand="lg">
                    {this.renderLogo()}
                    <NavbarMenu
                         is_loggedin={this.props.is_loggedin}
                    />
                    <span>
                        <div>
                            {is_loggedin? this.renderGreeting() : ""}
                        </div>
                        <div>
                            <Dropdown 
                                menuobjlist={this.makeDropdownContent()}
                                selected={this.props.selected_user_role}
                                handleSelection={this.changeDropdownSelection}
                            /> 
                        </div>
                    </span>
                </BootNavbar>
            </div>
        )
    }
}
