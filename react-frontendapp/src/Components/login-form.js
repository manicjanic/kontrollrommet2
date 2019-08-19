import React, { useState } from 'react';
import {Alert, Form, Button, Container} from 'react-bootstrap'
const LoginForm = (props) => {
    // Set local state
    const [form_data, setForm_data] = useState({
        username: '',
        password: '',
        error: false,
        errormessage: undefined
    })
    // Functions for handling changes in form
    const updateValue = (e) => {
        setForm_data({...form_data, [e.target.name]: e.target.value})    
    }

    const AlertMessage = () => {
        if (form_data.error) {
            return <Alert variant="danger">{form_data.errormessage}</Alert>
        }
        return ""
    }

    async function onSubmitLoginForm(e) {
        const {username, password} = form_data
        e.preventDefault();
        var response = await props.handleLogin(username, password)
        console.log("response", response)
        if (response.data[0] === "Wrong Credentials") {
            let errormessage = "Feil brukernavn/passord"
            let error=true
            setForm_data({username: "", password: "", error: error, errormessage: errormessage})
        }
        else {
            setForm_data({...form_data, username: "", password: "", error: false, errormessage: undefined})       
        }
    }
    return (
        <Container>
            <Form onSubmit={onSubmitLoginForm}>
                <Form.Group controlId="formGroupUsername">
                    <Form.Label>Username:</Form.Label>
                        <Form.Control
                            placeholder="Enter Username"
                            type="text"
                            name="username"
                            value={form_data.username}
                            onChange={updateValue}
                        />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password: </Form.Label>
                        <Form.Control
                            placeholder="Enter Password"
                            type="password" 
                            name="password"
                            value={form_data.password}
                            onChange={updateValue}
                        />
                    </Form.Group>
                <div>
                    <AlertMessage />
                </div>
                <br />
                    <Button variant="primary" type="submit">Enter</Button>
            </Form>
        </Container>
       
    );
  
}

export default LoginForm