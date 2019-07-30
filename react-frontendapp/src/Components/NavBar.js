import React from 'react';
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = (props) => {
    
    // Set function state to use for menu
    let menu = [
        {id:1, text: "Dashboard", disabled: true, hidden: false, path: "/dashboard" },
        {id:2, text: "Meetings", disabled: true, hidden: false, path: "/meetings"},
        {id:3, text: "Login", disabled: false, hidden: false, path: "/login"},
        {id:4, text: "Logout", disabled: true, hidden: true, path: "/logout"},   
    ]

    
    const Menu = (props) => {
        
        if (props.isLoggedin) {
            menu[0].disabled=false
            menu[1].disabled=false
            menu[2].disabled=true
            menu[2].hidden=true
            menu[3].disabled=false
            menu[3].hidden=false
        }
    
        return menu.map(function(_item, i){
            let _classname = "nav-link"
            if (_item.disabled) {_classname += " disabled"} 
            if (_item.hidden) {_classname += " d-none"}
            return <MenuItem item={_item} cn={_classname} key={i} />;              
        })
    }
    
    const MenuItem = (props) => {
        return (
            <li className="nav-item">
                <NavLink className={props.cn} to={props.item.path}>{props.item.text}</NavLink>
            </li>
        )    
    }


    const Greeting = (props) => {
        if (props.mePeppar.peppar_name !== undefined) {
            return "Hello, " + props.mePeppar.peppar_name
        }
        return ""
    }

    const RepresentationDropdown = (props) => {
        if (props.mePeppar.peppar_name !== undefined) {
            return props.myEntityRelations.map(function(_item, i) {
                return <RepresentationDropdownItem item={_item} key={i} />
            })
        }
        return ""
    }

    const RepresentationDropdownItem = (props) => {
        return <option>{props.item.relation_name}</option>
    }

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">Kontrollrommet</NavLink>
                <ul className="navbar-nav mr-auto">
                    <Menu isLoggedin={props.isLoggedin}/>
                    <li className="nav-item">
                        <span>Representing
                        <select className="custom-select">
                        <RepresentationDropdown 
                            mePeppar={props.mePeppar}
                            myEntityRelations={props.myEntityRelations}
                        />
                        </select>
                        </span>                        
                    </li>
                </ul>
                <span className="navbar-text">{Greeting(props)}</span>
            </nav>
        </div>
    )   
};

export default NavBar;
