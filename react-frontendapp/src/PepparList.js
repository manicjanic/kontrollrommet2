import React from 'react';
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const PepparList = (props) => {
    // Set function state to use for menu

    const Item = (props) => {
        return (
            <li>
                <NavLink className={props.cn} to={props.item.path}>{props.item.text}</NavLink>
            </li>
        )    
    }

    const ListMaker = (props) => {
            
        return Menu.map(function(_item, i){
            let _classname = "nav-link"
            if (_item.disabled) {
                _classname += " disabled"
            } 
            if (_item.hidden) {
                _classname += " d-none"
            }
            return <MenuItem item={_item} cn={_classname} key={i} />;              
        })
    }
    
    return (
    )   
};

export default PepparList;
