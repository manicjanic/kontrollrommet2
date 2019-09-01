import React from 'react';
import MeetingsTable from "../../Components/meetings-table"
import MeetingCard from "../../Components/meeting-card"
import {Button, Row, Col} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

// Layout
const Dashboard = (props) => {
    
    //Make derived data from State
    const makeTableData = () => {
        let tableobj = []
        const {meetings} = props
        for (let key in meetings) {
            let meeting = meetings[key]
            // Constuct Listobj
            let rowobj = {}
            let date = meeting.suggested_meetingdate? new Date(meeting.suggested_meetingdate).toLocaleDateString() : "no date specified"
            // If no Meeting type, set generic text
            if (!meeting.meeting_type_name) {meeting.meeting_type_name = "Meeting"}
            rowobj.text = meeting.meeting_type_name + (meeting.executive_entity? " i " + meeting.executive_entity.name : "")
            if (meeting.status === "DRAFT") {rowobj.text += " (Draft)"}
            rowobj.date = date
            rowobj.id = meeting.uuid
            // Add Listobj
            console.log ("tableobj", tableobj)
            tableobj.push(rowobj)   
        }
        return tableobj
    }
    
    const makeMeetingCardData = () => {
        if (props.selected_meeting_uuid) {
            let cardobj = {}
            let meetingobj = props.meetings[props.selected_meeting_uuid]
            let date = ""
            if (!meetingobj.suggested_meetingdate) {date = "no date"}
            else {date = new Date(meetingobj.suggested_meetingdate).toLocaleDateString()}
            cardobj.headline = meetingobj.meeting_type_name + " i " + meetingobj.executive_entity.name + " - " + date
            cardobj.participants = []
            meetingobj.participants.forEach(participant => {
                let listobj = {}
                listobj.text = participant.person_pacov.name
                listobj.id = participant.person_pacov.uuid
                cardobj.participants.push(listobj)
            })
            cardobj.topics = []
            const orderedtopics = meetingobj.topics.sort((a, b) => a.request_listposition - b.request_listposition)
            orderedtopics.forEach(topic => {
                let listobj = {}
                listobj.text = topic.request_headline
                listobj.id = topic.request_listposition
                cardobj.topics.push(listobj)
            })

            return cardobj
        }
        return undefined
    }

    return (
        <div>
            <Row>
                <Col>
                    <MeetingsTable 
                        tabledata={makeTableData()} 
                        changeMeetingSelection={props.changeMeetingSelection}
                    />
                </Col>
                <Col>
                    <MeetingCard 
                        meetingcarddata={makeMeetingCardData()}
                        is_selected={props.selected_meeting_uuid ? true : false}
                    />
                </Col>
            </Row>
            <Row>
                <LinkContainer to="/meetings/newmeetingrequest">
                    <Button variant="primary">New Meeting Request</Button>
                </LinkContainer>
            </Row>
        </div>
    )
}

export default Dashboard