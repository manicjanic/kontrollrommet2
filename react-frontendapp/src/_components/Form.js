import React from 'react';

// Dropdown menu element
// takes Props: Menuobjlist, selected, handleSelection(), 
const Dropdown = (props) => {
            
    if (props.menuobjlist.length) {
        const menuobjlist = props.menuobjlist        
        return (
            <div>
                <select value={props.selected.value} onChange={props.handleSelection}>
                        <DropdownList menuobjlist={menuobjlist}/>
                </select>
            </div>
        )
    }
    return ""
}

// List element
const DropdownList = (props) => {
    const dropdown = props.menuobjlist.map(menuitem => {
        return(
            <option value={menuitem.value} key={menuitem.value}>
                {menuitem.text}
            </option>
        )
    })
    return dropdown
}

export default Dropdown;
