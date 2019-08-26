import React from 'react';
import {Card, Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {Redirect} from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.min.css";
import {jsxGenerator} from '../_helpers/jsx-generator'


const MeetingCard = (props) => {
    console.log("running MeetingCard with this data", props.meetingcarddata)    
    
    const Invitedlist = (props) => 
        jsxGenerator.commalist({itemlist: props.inviteds, outputkey: "peppar_name"}) 
    
    const Agendalist = (props)  => 
        jsxGenerator.list({itemlist: props.agenda, outputkey: "peppar_name", idkey: "id"})

    const Participants = (props) => {
        if (props.meetingcarddata.participants.length) {
            return (
                <span>
                    <span style={{fontWeight: 'bold'}}>Inviterte: </span> 
                    {jsxGenerator.commalist({itemlist: props.meetingcarddata.participants})}
                </span>
            )    
                
        }
        return ""    
    }

    const Topics = (props) => {
        if (props.meetingcarddata.agenda_points.length) {
            return (
                <div>
                    <span style={{fontWeight: 'bold'}}>Agenda:</span>
                    <Agendalist agenda={props.meetingcarddata.agenda_points}/> 
                </div>
            )
        }
        return ""    
    }

    if (props.meetingcarddata.is_selected) {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{props.meetingcarddata.headline}</Card.Title>
                    <Participants meetingcarddata={props.meetingcarddata}/>
                    <br/>
                    <br/>
                    <Button variant="primary" onClick={() => props.onStartMeeting(props.meetingcarddata.id)}>Start Møte</Button>
                </Card.Body>                    
            </Card>
        )
    }
    return ""
}

export default MeetingCard