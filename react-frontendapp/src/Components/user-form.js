// React Modules
import React, { useState } from 'react';
import Form from '../_components/Form'

const UserForm = (props) => {    
    // Component state
    const [formdata, setFormdata] = useState({})
    
    // Handle changes in form values
    const updateValue = (e) => { 
        e.persist();
        const value = e.target.value
        setFormdata(prevState => ({...prevState, [e.target.name]: value})) 
    }  
    
    // Handle Button clicks
    const handleButtonClick = (e) => {
        if (e.target.name === "cancel-button") {handleCancel()}    
    }

    // Handle Cancelation
    const handleCancel = () => {
        console.log("Cancel")
    }

    // Handle Submit form
    const handleSubmit = (e) => {
        props.handleSubmit(formdata)
    }
    
    // Construction for formsetupobj
    let formsetupobj = {
        validation: true,
        formname: "user-form",
        inputfields: [{
            label: "Choose a Username:",
            type: "text",
            required: true,
            placeholder: "Enter username",               
            formdatakey: "username"
        },{
            label: "Enter Email:",
            type: "email",
            required: true,
            placeholder: "Enter valid email adress",               
            formdatakey: "email"
        },{
            label: "Make a Password:",
            type: "password",
            required: true,
            placeholder: "Enter password",               
            formdatakey: "password1"
        },{
            label: "Repeat Passwor:",
            type: "password",
            required: true,
            placeholder: "Repeat password",               
            formdatakey: "password2"
        }],
        buttons: [{
            text: "Register",
            type: "submit",
            name: "submit-form-button"
        },{
            text: "Cancel",
            type: "button",
            name: "cancel-button"
        }]
    }

    return (
        <div>
            <Form
                handleButtonClick={handleButtonClick}
                updateValue={updateValue}
                formsetupobj={formsetupobj}
                formdata={formdata}
                handleSubmit={handleSubmit}
            />
        </div>       
    );
  
}

export default UserForm