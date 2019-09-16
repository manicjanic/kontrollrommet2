// React Modules
import React, { useState } from 'react';
// React Bootstrap Elements
import {Form as BForm, Button} from 'react-bootstrap'

//Standard Component: Form
const Form = (props) => {
    // Gather Props
    const {formsetupobj, formdata, updateValue, handleButtonClick, handleSubmit} = props   
    // Component State for validation
    const [validated, setValidated] = useState(false);
    
    // Check Validity
    const onSubmit = (e) => {
        const form = e.currentTarget
        if (form.checkValidity() === false && formsetupobj.validation === true) {
          e.preventDefault();
          e.stopPropagation();
          setValidated(true);
        }
        if (form.checkValidity() === true || formsetupobj.validation === false) {
            e.preventDefault();
            handleSubmit()
          }
    }

    // JSX-Element
    const renderInputFields = () => (
        formsetupobj.inputfields.map((element, i) => 
            <FormField 
                key={i}
                inputfield={element}
                formdata={formdata}
                updateValue={updateValue}
            />
        )
    )        
    
    // JSX-Element
    const renderButtons = () => (
        formsetupobj.buttons.map((element, i) => 
            <ButtonElement 
                key={i}
                buttondata={element}
                handleButtonClick={handleButtonClick}
            />
        )
    )
        
    return (
        <div>
            <BForm noValidate validated={validated} onSubmit={onSubmit} id={formsetupobj.id}>
                {formsetupobj.inputfields? renderInputFields() : ""}
                {formsetupobj.buttons? renderButtons() : ""}
            </BForm>
        </div>
    )
}

// FormField Element
const FormField = (props) => {
    // Gather Props
    let {inputfield, formdata, updateValue} = props
    
    if (inputfield.type === "select") {
        return (
            <div>
                <BForm.Label>{inputfield.label}</BForm.Label>
                <BForm.Control as="select" 
                    required={inputfield.required}
                    placeholder={inputfield.placeholder}
                    name={inputfield.formdatakey}
                    value={formdata[inputfield.formdatakey] || ""}
                    onChange={updateValue}
                >
                {inputfield.options.map(element => (
                    <option key={element.id} value={element.id}>{element.text}</option>
                ))}
                </BForm.Control>
            </div>
        )     
    }
    return (
        <div>
            <BForm.Label>{inputfield.label}</BForm.Label>
            <BForm.Control
                type={inputfield.type}
                required={inputfield.required}
                placeholder={inputfield.placeholder}
                name={inputfield.formdatakey}
                value={formdata[inputfield.formdatakey] || ""}
                onChange={updateValue}
            />
        </div>
    )
}

// Button Element
const ButtonElement = (props) => {
    // Gather Props
    let {buttondata, handleButtonClick} = props
    
    return (
        <Button 
            type={buttondata.type}
            name={buttondata.name}
            onClick={handleButtonClick}
        >
        {buttondata.text}
        </Button>)
}

export default Form;
