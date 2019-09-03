import React from 'react';
import {Card, Button} from 'react-bootstrap'
import {List} from '../_components/List'


const MeetingCard = (props) => {
    
    const {meetingcarddata} = props

    const Participants = (props) => {
        if (meetingcarddata.participants.length) {
            return (
                <span>
                    <span style={{fontWeight: 'bold'}}>Inviterte: </span> 
                    <List.Inline displayobj={meetingcarddata.participants}/>
                </span>
            )    
                
        }
        return ""    
    }

    const handleClick = (e) => {
        console.log("clicked item", e)
    }

    const Topics = (props) => {
        if (meetingcarddata.topics.length) {
            return (
                <div>
                    <div style={{fontWeight: 'bold'}}>Agenda: </div> 
                    <List.Unordered 
                        displayobj={meetingcarddata.topics}
                        handleClick={handleClick}
                    />
                </div>
            )    
                
        }
        return ""    
    }



    if (meetingcarddata) {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{meetingcarddata.headline}</Card.Title>
                    <Participants meetingcarddata={meetingcarddata}/>
                    <br/>
                    <Topics meetingcarddata={meetingcarddata}/>
                    <br/>
                    <Button variant="primary" onClick={() => props.onStartMeeting(meetingcarddata.id)}>Start Møte</Button>
                </Card.Body>                    
            </Card>
        )
    }
    return ""
}

export default MeetingCard