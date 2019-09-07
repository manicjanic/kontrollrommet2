import React from 'react';

const Unordered = (props) => {
    const {displayobj} = props
    if (displayobj) {
        return (
            <ul>
                {displayobj.map((item, i) => <li className={props.name} onClick={props.handleClick} key={item.id} id={item.id} value={item.value? item.value : i}>
                    {item.text}
                </li>)}
            </ul>
        )
    }
    return ""
}

const Ordered = (props) => {
    const {displayobj} = props
    return (
        <ol>
            {displayobj.map((item, i) => <li className={props.name} onClick={props.handleClick} key={item.id} id={item.id} value={item.value? item.value : i}>
                {item.text}
            </li>)}
        </ol>
    )

};

const Inline = (props) => {
    const { displayobj } = props
    const length = displayobj.length
    return (
    <ul>
        {displayobj.map((item, i) => 
        <li style={{display: 'inline'}} className={props.name} onClick={props.handleClick} key={item.id} id={item.id} value={item.value? item.value : i}>
            {item.text}
            {i === length-1? "" : ", "} 
        </li>)}
    </ul>
)

}

export const List = {
    Unordered,
    Ordered,
    Inline
};