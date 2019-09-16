// React Modules
import React, { useState } from 'react';
import Form from '../_components/Form'

// Login Form Component
const LoginForm = (props) => {    
    // Component state
    const [formdata, setFormdata] = useState({})
    
    // Handle changes in form values
    const updateValue = (e) => { 
        e.persist();
        const value = e.target.value
        setFormdata(prevState => ({...prevState, [e.target.name]: value})) 
    }  
    
    // Handle Submit form
    const handleSubmit =  () => {
        props.handleEvent({
            componentid: "login-form",
            action: "submit-data",
            data: formdata
        })
    }

    // Construct formsetupobj
    let formsetupobj = {
        id: "login-form",
        validation: true,
        inputfields: [{
            label: "Username:",
            type: "text",
            required: true,
            placeholder: "Enter username",               
            formdatakey: "username"
        },{
            label: "Password:",
            type: "password",
            required: true,
            placeholder: "Enter password",               
            formdatakey: "password"
        }],
        buttons: [{
            text: "Enter",
            type: "submit",
            name: "submit-form-button"
        }]
    }

    return (
        <div>
            <Form
                formsetupobj={formsetupobj}
                formdata={formdata}
                updateValue={updateValue}
                handleSubmit={handleSubmit}
            />
        </div>       
    );
  
}

export default LoginForm