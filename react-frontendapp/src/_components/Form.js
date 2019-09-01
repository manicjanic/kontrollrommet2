import React from 'react';
import {Form as BForm, Button} from 'react-bootstrap'

const FormField = (props) => {
    let {inputfield} = props
    return (
        <div>
            <BForm.Label>{inputfield.label}</BForm.Label>
            <BForm.Control
                placeholder={inputfield.defaultvalue}
                type={inputfield.type}
                name={inputfield.formdatakey}
                value={props.formdataobj[inputfield.formdatakey]}
                onChange={props.updateValue}
            />
        </div>
    )
}

const ButtonElement = (props) => {
    let {buttondata} = props
    return <Button type={buttondata.type}>{buttondata.text}</Button>
}

//Form element
// takes Props: formsetupobj, formdataobj, handleSubmit(), updateValue()
const Form = (props) => {
    const {formsetupobj} = props   
    return (
        <div>
            <BForm onSubmit={props.handleSubmit}>
                {formsetupobj.inputfields.map(element => <FormField 
                    inputfield={element}
                    formdataobj={props.formdataobj}
                    updateValue={props.updateValue}
                />)}             
                {formsetupobj.buttons.map(element => <ButtonElement 
                    buttondata={element}
                />)}
            </BForm>
        </div>
    )
}

export default Form;
