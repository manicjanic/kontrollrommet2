import React from 'react';
import MeetingsTable from "../../Components/meetings-table"
import MeetingCard from "../../Components/meeting-card"
import {Button, Row, Col} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

// Layout
const Dashboard = (props) => {
    
    //Make derived data from props
    const makeTableData = () => {
        const {meetings} = props
        let tableobj = []
        for (let key in meetings) {
            let meeting = meetings[key]
            // Constuct Listobj
            let rowobj = {}
            let date = meeting.suggested_meetingdate? new Date(meeting.suggested_meetingdate).toLocaleDateString() : "no date specified"
            // If no Meeting type, set generic text
            let type = meeting.meeting_type_name? meeting.meeting_type_name : "Meeting"
            let entity = meeting.executive_entity? ( " i " + meeting.executive_entity.name) : ""
            rowobj.text = type + entity
            if (meeting.status === "DRAFT") {rowobj.text += " (Draft)"}
            rowobj.date = date
            rowobj.id = meeting.uuid
            // Add Listobj
            tableobj.push(rowobj)   
        }
        return tableobj
    }
    
    //
    const makeMeetingCardData = () => {
        let cardobj = {}
        let rowdata = props.selected_meeting_row
        let meetingobj = props.meetings[rowdata.id]
        cardobj.headline = rowdata.text + " - " + rowdata.date
        cardobj.participants = []
        meetingobj.participants.forEach(participant => {
            let listobj = {}
            listobj.text = participant.person_pacov.name
            listobj.value = participant.person_pacov.uuid
            cardobj.participants.push(listobj)
        })
        cardobj.topics = []
        const orderedtopics = meetingobj.topics.sort((a, b) => a.request_listposition - b.request_listposition)
        orderedtopics.forEach((topic, i) => {
            let listobj = {}
            listobj.text = topic.request_headline
            listobj.position = i
            listobj.id = topic.topic_pacov.uuid
            cardobj.topics.push(listobj)
        })
        return cardobj
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
                    {props.selected_meeting_row?
                        <MeetingCard 
                            meetingcarddata={makeMeetingCardData()}
                            is_selected={props.selected_meeting_row_uuid ? true : false}
                        />
                    :
                        ""
                    }
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