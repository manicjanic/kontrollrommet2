import React from 'react';
import {Form as BForm, Button} from 'react-bootstrap'

//Form element
// takes Props: formsetupobj, formdataobj, handleSubmit(), updateValue()
const Form = (props) => {
    const {formsetupobj, handleSubmit} = props   
    return (
        <div>
            <BForm onSubmit={handleSubmit}>
                {formsetupobj.inputfields.map((element, i) => <FormField 
                    inputfield={element}
                    formdataobj={props.formdataobj}
                    updateValue={props.updateValue}
                    key={i}
                />)}             
                {formsetupobj.buttons.map((element, i) => <ButtonElement 
                    buttondata={element}
                    key={i}
                />)}
            </BForm>
        </div>
    )
}

const FormField = (props) => {
    let {inputfield} = props
    
    if (inputfield.type === "select") {
        return (
            <div>
                <BForm.Label>{inputfield.label}</BForm.Label>
                <BForm.Control as="select"
                    placeholder={inputfield.placeholder}
                    name={inputfield.formdatakey}
                    value={props.formdataobj[inputfield.formdatakey] || ""}
                    onChange={props.updateValue}
                >
                {inputfield.options.map(element => (
                    <option key={element.value} value={element.value}>{element.text}</option>
                ))}
                </BForm.Control>
            </div>
        )     
    }

    return (
        <div>
            <BForm.Label>{inputfield.label}</BForm.Label>
            <BForm.Control
                placeholder={inputfield.placeholder}
                type={inputfield.type}
                name={inputfield.formdatakey}
                value={props.formdataobj[inputfield.formdatakey] || ""}
                onChange={props.updateValue}
            />
        </div>
    )
}

const ButtonElement = (props) => {
    let {buttondata} = props
    return <Button type={buttondata.type}>{buttondata.text}</Button>
}

export default Form;
