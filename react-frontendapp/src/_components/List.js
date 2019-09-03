import React from 'react';

const Unordered = (props) => {
    const {displayobj} = props
    if (displayobj) {
        return (
            <ul>
                {displayobj.map(item => <li onClick={props.handleClick} key={item.value} value={item.position} id={item.value}>
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
            {displayobj.map(item => <li key={item.value} value={item.position} id={item.value}>{item.text}</li>)}
        </ol>
    )

};

const Inline = (props) => {
    const { displayobj } = props
    const length = displayobj.length
    return (
    <ul>
        {displayobj.map((item, i) => 
        <li style={{display: 'inline'}} key={item.value} value={item.position} id={item.value}>
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