import React, { useState } from 'react';
import {Form, Button, Container, Row, Col, Card} from 'react-bootstrap'

const MeetingRequestForm = (props) => {
    // Set local state
    const [form_data, setForm_data] = useState({
        meetingdate: {},
        meetingtype: {},
        topics: [],
        persons: []
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
            <Row>
                <Col>
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
                        <Form.Group>
                            <Form.Label>Meeting Type </Form.Label>
                            <Form.Control
                                as="select"
                                placeholder="Chose Meeting Type"
                                type="select" 
                                name="meetingtype"
                                value={form_data.meetingtype}
                                onChange={updateValue}
                            >
                            <option>Please Select</option>
                            {props.meeting_scheme.scheme.meeting_type_choices.map((choice, index) => <option value={index}>{choice.meeting_type_name}</option>)}
                            </Form.Control>
                            <Form.Label>Select Topics</Form.Label>
                            <Form.Control 
                            as="select" multiple
                            placeholder="Chose Meeting Type"
                            type="select" 
                            name="topics"
                            value={form_data.topics}
                            onChange={updateValue}
                            >
                            {result => {for (let topic in props.topics) {
                                 return <option value={topic}>{props.topics[topic].name}</option>}
                                 return result
                                }
                            }
                            </Form.Control>
                                                </Form.Group>
                        <br />
                        <Button variant="primary" type="submit">Make request</Button>
                    
                    </Form>
                </Col>
                    <Card>
                        Here comes a Card
                    </Card>
                <Col>

                </Col>
            </Row>
        </Container>
       
    );
  
}

export default MeetingRequestForm