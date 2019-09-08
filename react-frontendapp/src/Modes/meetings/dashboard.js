import React from 'react';

import MeetingsTable from "../../Components/meetings-table"
import MeetingCard from "../../Components/meeting-card"

import {Button, Row, Col} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

// Layout
const Dashboard = (props) => {
    const {meetings} = props
    //Make derived data from props
    const makeTableData = () => {
        let tableobj = []
        for (let key in meetings) {
            let rowobj = {}
            let meeting = meetings[key]
            // Find date
            let date = meeting.specific_data.suggested_meetingdate? new Date(meeting.specific_data.suggested_meetingdate).toLocaleDateString() : "no date specified"
            // Find meeting type
            let type = meeting.specific_data.meeting_type_name? meeting.specific_data.meeting_type_name : "A Meeting"
            // Find entity
            let entity_name = meeting.executive_entity? " i " + meeting.executive_entity.name : ""             
            let text = type + entity_name
            if (meeting.status === "DRAFT") {text += " (Draft)"}
            // Make row object
            rowobj.text = text
            rowobj.date = date
            rowobj.id = meeting.uuid
            // Add to tableobj
            tableobj.push(rowobj)   
        }
        return tableobj
    }
    
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