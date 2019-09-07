import React, { Component } from 'react';
import { Navbar as BootNavbar} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import NavbarMenu from '../Components/navbar-menu'
import Dropdown from '../_components/Dropdown'

export default class Navbar extends Component {
    
    // Make content data for dropdown menu
    makeDropdownContent = () => {
        const {user_roles} = this.props
        let menuobj_list = []
        for (let key in user_roles) {
            let user_role = user_roles[key]
            let menuobj = {}
            let entity_name = user_role.pacovB.name
            let role_name = user_role.role_type_name
            menuobj.text = entity_name + " as " + role_name
            menuobj.value = key
            menuobj_list.push(menuobj)   
        };
        return menuobj_list
    }

    // Callback for handling changes in Dropdown
    changeDropdownSelection = (e) => {
        console.log("props in change selection", this.props.user_roles)
        let value = e.target.value
        let selected = this.props.user_roles[value]
        this.props.alterState({selected_user_role: selected}) 
    }

    // JSX-Element
    renderLogo = () => (
        <LinkContainer to="/">
            <BootNavbar.Brand>Kontrollrommet</BootNavbar.Brand>
        </LinkContainer>
    )
    
    // JSX-Element
    renderGreeting = () => {
        const { user_pacov } = this.props
        return (user_pacov? 
            <span>Hello, {user_pacov.name}. You are currently representing</span>
            :
            <span>Hello, stranger.</span>
        )
    }

    renderMenu = () => {
        return <NavbarMenu is_loggedin={this.props.is_loggedin}/>
    }
    
    renderDropdown = () => {
        let menuobjlist = this.makeDropdownContent()
        return (menuobjlist.length? 
            <Dropdown 
                menuobjlist={this.makeDropdownContent()}
                selected={this.props.selected_user_role}
                handleSelection={this.changeDropdownSelection}
            /> 
            :
            ""
        )
    }
    render() {
        const { is_loggedin } = this.props
        return (
            <div>
                <BootNavbar bg="light" expand="lg">
                    {this.renderLogo()}
                    {this.renderMenu()}
                    <span>
                        <div>
                            {is_loggedin? this.renderGreeting() : ""}
                        </div>
                        <div>
                            {this.renderDropdown()}
                        </div>
                    </span>
                </BootNavbar>
            </div>
        )
    }
}
