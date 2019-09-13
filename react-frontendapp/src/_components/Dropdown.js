// React Modules
import React from 'react';

// Dropdown Standard Component
const Dropdown = (props) => {
    // Gather Props
    const {menuobj, selected, handleSelection} = props                    
    
    // JSX-Element
    const renderMenuItems = () => {
        return (
            menuobj.menuitems.map(menuitem => {
                return(
                    <option value={menuitem.value} key={menuitem.value}>
                        {menuitem.text}
                    </option>
                )
            })
        )
    }

    return (
        <div>
            <select value={selected.value} onChange={handleSelection}>
                    {menuobj.menuitems? renderMenuItems() : ""}
            </select>
        </div>
    )

}

export default Dropdown;
