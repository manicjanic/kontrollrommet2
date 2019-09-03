import React from 'react';
import {Sortable as RSortable} from 'react-sortablejs';


// Functional Component
const SharedGroup = (props) => {
    let {objlist} = props
    let items = objlist.map(obj => (<li key={obj.value} data-id={obj.value}>{obj.text}</li>));
 
    return (
        <RSortable
            // See all Sortable options at https://github.com/RubaXa/Sortable#options
            options={{
                group: 'shared'
            }}
            tag="ul"
        >
            {items}
        </RSortable>
    );
};
 
export const Sortable = {
    SharedGroup
}