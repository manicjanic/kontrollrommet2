import React from 'react';

// itemlist = objectlist with data
// outputkey = key in object for the data that is to be displayed
// idkey = key in object that is used for id purposes
// Takes a list of items, writes up data on specific key from each item in a commalist.
const commalist = (Obj) => {
    const { itemlist, outputkey } = Obj
    const length = itemlist.length
    let result_string = ""
    itemlist.forEach((item ,i) => {
        result_string += item[outputkey]
        if (length !== i+1) {
            result_string += ", "
        }
    });
    return (<span>{result_string}</span>)
}

const list = (Obj) => {
    const { itemlist, outputkey, idkey } = Obj
    console.log("list working", itemlist, outputkey, idkey)
    const List = (props) => {
        console.log("itemlist", props.itemlist)
        return props.itemlist.map(item => {
            return (<li key={item[props.idkey]} value={item[props.idkey]}>{item[outputkey]}</li>)
        })
    }
    
    return (
        <ul>
            <List itemlist={itemlist} idkey={idkey}/>
        </ul>
    )
}

export const jsxGenerator = {
    commalist, list
}