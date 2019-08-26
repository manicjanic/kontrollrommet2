import React from 'react';

// Simple repeatable jsx components 
// itemlist = Array of objects
// idkey = key in object that is used for id purposes

// Takes a list of items, writes them as one text with commas.
const commalist = (props) => {
    const { itemlist } = props
    const length = itemlist.length
    let result_string = ""
    itemlist.forEach((item ,i) => {
        result_string += item.text
        if (length !== i+1) {
            result_string += ", "
        }
    });
    return (<span>{result_string}</span>)
}


const list = (props) => {
    return (
        <ul>
            {props.itemlist.map(item => <li key={item.id} value={item.id}>{item.text}</li>)}
        </ul>
    )
}

export const jsxGenerator = {
    commalist, list
}