import React from 'react';
import {Card, Button} from 'react-bootstrap'
import {jsxGenerator} from '../_helpers/jsx-generator'


const MeetingCard = (props) => {
    
    const Participants = (props) => {
        if (props.meetingcarddata.participants.length) {
            return (
                <span>
                    <span style={{fontWeight: 'bold'}}>Inviterte: </span> 
                    <jsxGenerator.commalist itemlist={props.meetingcarddata.participants}/>
                </span>
            )    
                
        }
        return ""    
    }

    const Topics = (props) => {
        if (props.meetingcarddata.topics.length) {
            return (
                <div>
                    <div style={{fontWeight: 'bold'}}>Agenda: </div> 
                    <jsxGenerator.list itemlist={props.meetingcarddata.topics}/>
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
                    <Participants meetingcarddata={props.meetingcarddata}/>
                    <br/>
                    <Topics meetingcarddata={props.meetingcarddata}/>
                    <br/>
                    <Button variant="primary" onClick={() => props.onStartMeeting(props.meetingcarddata.id)}>Start Møte</Button>
                </Card.Body>                    
            </Card>
        )
    }
    return ""
}

export default MeetingCard