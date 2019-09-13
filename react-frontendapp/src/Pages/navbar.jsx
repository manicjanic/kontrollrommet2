// React Modules
import React, { Component } from 'react';
// React Bootstrap Elements
import { Navbar as BootNavbar} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
// Specific Components
import NavbarMenu from '../Components/navbar-menu'
import NavbarDropdown from "../Components/navbar-dropdown";

// Navbar Page Component
export default class Navbar extends Component {
    
    // Callback for handling changes in Dropdown
    changeDropdownSelection = (e) => {
        let value = e.target.value
        let selected_user_role = this.props.user_roles[value]
        this.props.alterState({selected_user_role: selected_user_role}) 
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

    // JSX-Element
    renderMenu = () => {
        return <NavbarMenu is_loggedin={this.props.is_loggedin}/>
    }
    
    // JSX-Element
    renderDropdown = () => {
        return (
            <NavbarDropdown
                selected_user_role={this.props.selected_user_role}
                handleSelection={this.changeDropdownSelection}
                user_roles={this.props.user_roles}
                pacovs={this.props.pacovs}
            />)
    }

    render() {
        const { is_loggedin } = this.props
        return (
            <div>
                <BootNavbar bg="light" expand="lg" className="main-navbar">
                    {this.renderLogo()}
                    {this.renderMenu()}
                    <span>
                        <div>
                            {is_loggedin? this.renderGreeting() : ""}
                        </div>
                        <div>
                            {Object.keys(this.props.user_roles).length? this.renderDropdown() : ""}
                        </div>
                    </span>
                </BootNavbar>
            </div>
        )
    }
}
