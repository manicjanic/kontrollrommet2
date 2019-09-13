// React Modules
import React from 'react';
// React Bootstrap Elements
import {ListGroup} from 'react-bootstrap'

// Unordered List
const Unordered = (props) => {
    // Get Displayobject from props
    const {displayobj} = props
    
    if (displayobj) {
        return (
            <ListGroup>
                {displayobj.map((item, i) => 
                    <ListGroup.Item 
                        className={props.name} 
                        onClick={props.handleClick} 
                        key={item.id} 
                        id={item.id} 
                        value={item.value? item.value : i}
                    >
                        {item.text}
                    </ListGroup.Item>
                )}
            </ListGroup>
        )
    }
    return ""
}

// Ordered List
const Ordered = (props) => {
    // Get Displayobject from props
    const {displayobj} = props
    
    return (
        <ol>
            {displayobj.map((item, i) => 
                <li 
                    className={props.name} 
                    onClick={props.handleClick} 
                    key={item.id} 
                    id={item.id} 
                    value={item.value? item.value : i}
                >
                    {item.text}
                </li>
            )}
        </ol>
    )

};

const Inline = (props) => {
    // Get Displayobject from props
    const { displayobj } = props
    const length = displayobj.length
    
    return (
        <ul>
            {displayobj.map((item, i) => 
                <li 
                    style={{display: 'inline'}} 
                    className={props.name} 
                    onClick={props.handleClick} 
                    key={item.id} 
                    id={item.id} 
                    value={item.value? item.value : i}
                >
                    {item.text}
                    {i === length-1? "" : ", "} 
                </li>
            )}
        </ul>
    )

}

export const List = {
    Unordered,
    Ordered,
    Inline
};