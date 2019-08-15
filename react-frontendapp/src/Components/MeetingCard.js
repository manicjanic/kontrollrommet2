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

    const Inviteds = (props) => {
        if (props.meetingcarddata.inviteds.length) {
            return (
                <span>
                    <span style={{fontWeight: 'bold'}}>Inviterte: </span> 
                    <Invitedlist inviteds={props.meetingcarddata.inviteds}/>
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

    if (props.meetingcarddata) {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{props.meetingcarddata.headline}</Card.Title>
                    <Inviteds meetingcarddata={props.meetingcarddata}/>
                    <br/>
                    <br/>
                    <Topics meetingcarddata={props.meetingcarddata}/>
                    <Button variant="primary" onClick={() => props.onStartMeeting(props.meetingcarddata.id)}>Start Møte</Button>
                </Card.Body>                    
            </Card>
        )
    }
    return ""
}

export default MeetingCard