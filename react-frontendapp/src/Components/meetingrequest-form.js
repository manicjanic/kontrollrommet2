import React, { useState } from 'react';
import {Form, Button, Container} from 'react-bootstrap'

const MeetingRequestForm = (props) => {
    // Set local state
    const [form_data, setForm_data] = useState({
        meetingdate: {},
        meetingtype: {},
        agendapoints: [],
        inviteds: []
    })
    const [choice_data, setChoice_data] = useState({
        suggested_agendapoints: [],
        suggested_inviteds: [],
        suggested_meetingtypes: []
    })

    // Functions for handling changes in form
    const updateValue = (e) => {
        setForm_data({...form_data, [e.target.name]: e.target.value})    
    }

    async function onSubmitForm(e) {
        e.preventDefault();
    }
    
    return (
        <Container>
            <Form onSubmit={onSubmitForm}>
                <Form.Group>
                    <Form.Label>Suggested Meeting Date:</Form.Label>
                        <Form.Control
                            placeholder="Enter Date"
                            type="date"
                            name="meetingdate"
                            value={form_data.meetingdate}
                            onChange={updateValue}
                        />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Meeting Type </Form.Label>
                    <Form.Control
                        as="select"
                        placeholder="Chose Meeting Type"
                        type="select" 
                        name="meetingtype"
                        value={form_data.meetingtype}
                        onChange={updateValue}
                    />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">Make request</Button>
            </Form>
        </Container>
       
    );
  
}

export default MeetingRequestForm