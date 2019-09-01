import React, { useState } from 'react';
import Form from '../_components/Form'
import {Alert} from 'react-bootstrap'

const LoginForm = (props) => {
    // Set local state
    const [formdata, setFormdata] = useState({
        username: '',
        password: '',
        error: false,
        errormessage: undefined
    })
    
    let formsetupobj = {
        inputfields: [{
            label: "Username:",
            type: "text",
            value: formdata.username,
            options: [{
                text: "",
                value: undefined
            }],
            formdatakey: "username",
            defaultvalue: "Enter username"               
        }, {
            label: "Password:",
            type: "password",
            value: formdata.password,
            options: [{
                text: "",
                value: undefined
            }],
            formdatakey: "password",
            defaultvalue: "Enter password"               
        }],
        buttons: [{
            text: "Enter",
            type: "submit"
        }],
        layoutinfo: undefined
    }

    // Function for handling changes in form
    const updateValue = (e) => {
        setFormdata({...formdata, [e.target.name]: e.target.value})    
    }

    // Function for submit form
    async function onSubmitForm(e) {
        const {username, password} = formdata
        e.preventDefault();
        var response = await props.handleSubmit(username, password)
        if (response.data[0] === "Wrong Credentials") {
            let errormessage = "Feil brukernavn/passord"
            let error=true
            setFormdata({username: "", password: "", error: error, errormessage: errormessage})
        }
        else {
            setFormdata({...formdata, username: "", password: "", error: false, errormessage: undefined})       
        }
    }

    // Layout element, active on prop
    const AlertMessage = () => {
        if (formdata.error) {
            return <Alert variant="danger">{formdata.errormessage}</Alert>
        }
        return ""
    }

    return (
        <div>
            <Form
                handleSubmit={onSubmitForm}
                updateValue={updateValue}
                formsetupobj={formsetupobj}
                formdataobj={formdata}

            />
            <AlertMessage />
        </div>
       
    );
  
}

export default LoginForm