// React Modules
import React from 'react';
import Dropdown from '../_components/Dropdown'
// Helpers and Services
import {constructionService} from '../_services/construction-service'

const NavbarDropdown = (props) => {    
    // Gather Props
    const {user_roles, pacovs, selected_user_role, handleSelection} = props

    // Make Menu Object
    const menuobj = {menuitems: constructMenuItems()}
    // Make selected Object
    const selected = {value: selected_user_role.uuid}
    // Make content data for dropdown menu
    function constructMenuItems() {
        const user_roles_expanded = constructionService.expandPacovsInRelations(pacovs, user_roles)
        // let user_roles_expanded = user_roles 
        let menuitems = []
        for (let key in user_roles_expanded) {
            let user_role = user_roles_expanded[key]
            console.log("user_role", JSON.parse(JSON.stringify(user_role)))
            let item = {}
            let entity_name = user_role.pacovB.name
            let role_name = user_role.specific_data.role_type_name
            item.text = entity_name + " as " + role_name
            item.value = key
            menuitems.push(item)   
        };
        return menuitems
    }

    return (
        <div>
            <Dropdown
                menuobj={menuobj}
                selected={selected}
                handleSelection={handleSelection}
            />
        </div>       
    );
    
}

export default NavbarDropdown