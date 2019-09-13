import React from 'react';
import {Card, Button} from 'react-bootstrap'
import {List} from '../_components/List'


const MeetingCard = (props) => {
    
    const {meetingcarddata} = props    
    //
    const makeMeetingCardData = () => {
        let cardobj = {}
        let rowdata = props.selected_meeting_row
        let meeting = props.meetings[rowdata.id]
        console.log("chosen meeting:", meeting)
        cardobj.headline = rowdata.text + " - " + rowdata.date
        cardobj.participants = meeting.participants.map(item => {
            return {text: item.person_pacov.name, id: item.person_pacov.uuid}
        })
        cardobj.topics = meeting.topics.map(item => {
            return {text: item.topic_pacov.name, id: item.topic_pacov.uuid, value: item.request_listposition}
        })
        // Sort in order
        cardobj.topics = cardobj.topics.sort((a, b) => a.value - b.value)
        return cardobj
    }

    
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