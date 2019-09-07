import React from 'react';
import {Form as BForm, Button} from 'react-bootstrap'

//Form element
// takes Props: formsetupobj, formdataobj, handleSubmit(), updateValue()
const Form = (props) => {
    const {formsetupobj, handleSubmit} = props   
    
    const renderInputFields = () => {
        return (
            formsetupobj.inputfields.map((element, i) => <FormField 
                inputfield={element}
                formdataobj={props.formdataobj}
                updateValue={props.updateValue}
                key={i}
            />)
        )    
    }    

    const renderButtons = () => {
        return (
            formsetupobj.buttons.map((element, i) => <ButtonElement 
                buttondata={element}
                key={i}
            />)
        )
    }    

    const ButtonElement = (props) => {
        let {buttondata} = props
        return <Button key={props.key} type={buttondata.type}>{buttondata.text}</Button>
    }

    const FormField = (props) => {
        let {inputfield} = props
        
        if (inputfield.type === "select") {
            return (
                <div key={props.key}>
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
            <div key={props.key}>
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
        
    return (
        <div>
            <BForm onSubmit={handleSubmit}>
                {formsetupobj.inputfields? renderInputFields() : ""}
                {formsetupobj.buttons? renderButtons() : ""}
            </BForm>
        </div>
    )
}

export default Form;
