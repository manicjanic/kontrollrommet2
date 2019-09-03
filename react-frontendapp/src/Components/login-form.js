import React from 'react';
import Form from '../_components/Form'

const LoginForm = (props) => {
    
    let formsetupobj = {
        inputfields: [{
            label: "Username:",
            type: "text",
            formdatakey: "username",
            placeholder: "Enter username"               
        }, {
            label: "Password:",
            type: "password",
            formdatakey: "password",
            placeholder: "Enter password"               
        }],
        buttons: [{
            text: "Enter",
            type: "submit"
        }],
        layoutinfo: undefined
    }

    return (
        <div>
            <Form
                handleSubmit={props.handleSubmit}
                updateValue={props.updateValue}
                formsetupobj={formsetupobj}
                formdataobj={props.formdata}
            />
        </div>       
    );
  
}

export default LoginForm