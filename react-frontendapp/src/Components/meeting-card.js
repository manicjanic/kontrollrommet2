import React from 'react';
import {Card, Button} from 'react-bootstrap'
import {List} from '../_components/List'

const MeetingCard = (props) => {
    // Gather Props
    const {meetings, selected_meeting_row} = props    
    
    // Define Display Object
    let cardobj = makeMeetingCardData()
    
    // Make Meeting Card Display data from Page Props
    function makeMeetingCardData() {
        let rowdata = selected_meeting_row
        let meeting = meetings[rowdata.id]
        console.log("chosen meeting:", meeting)
        let cardobj = {}
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

    const handleClick = (e) => {
        console.log("clicked item", e)
    }

    // JSX-Element
    const renderParticipants = () => {
        return (
            <span>
                <span style={{fontWeight: 'bold'}}>Inviterte: </span> 
                <List.Inline displayobj={cardobj.participants}/>
            </span>
        )    
            
    }

    // JSX-Element
    const renderTopics = () => {
        return (
            <div>
                <div style={{fontWeight: 'bold'}}>Agenda: </div> 
                <List.Unordered 
                    displayobj={cardobj.topics}
                    handleClick={handleClick}
                />
            </div>
        )             
    }



    return (
        <Card>
            <Card.Body>
                <Card.Title>{cardobj.headline? cardobj.headline : ""}</Card.Title>
                {cardobj.participants.length? renderParticipants() : "No one has been invited"}
                <br/>
                {cardobj.topics.length? renderTopics() : "Meeting has no topics"}
                <br/>
                <Button variant="primary" onClick={() => props.onStartMeeting()}>Start Møte</Button>
            </Card.Body>                    
        </Card>
    )
}

export default MeetingCard