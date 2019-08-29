import React, { Component } from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { PrivateRoute } from '../_components';
import {ConstructionService} from '../_services/construction-service'
import {filterService} from '../_services/filter-service'
import {ID as SET_ID, KEY} from '../_helpers/lookup-table'

import MeetingRequestForm from "../Components/meetingrequest-form"
import MeetingsTable from "../Components/meetings-table"
import MeetingCard from "../Components/meeting-card"

export default class MeetingsPage extends Component {

    state = {
        meetingobjlist: ConstructionService.constructMeetingObjList(this.props.pacovs, this.props.relations),
        selected_meeting_uuid: "",
        meeting_scheme: filterService.findCategoryScheme(this.props.schemes, SET_ID.MEETING_ID)
    }

    // Callback for choosing selected meeting
    changeMeetingSelection = (uuid) => {
        this.setState({selected_meeting_uuid: uuid})
    }

    //Make derived data from State
    makeTableData() {
        let tableobj = []
        this.state.meetingobjlist.forEach((meetingobj) => {
            // Constuct Listobj
            let rowobj = {}
            let date = meetingobj.suggested_date? new Date(meetingobj.suggested_date).toLocaleDateString() : "no date specified"
            // If no Meeting type, set generic text
            if (!meetingobj.type) {meetingobj.type = "Meeting"}
            rowobj.text = meetingobj.type + (meetingobj.organization? " i " + meetingobj.organization.name : "")
            if (meetingobj.status === "DRAFT") {rowobj.text += " (Draft)"}
            rowobj.date = date
            rowobj.id = meetingobj.uuid
            // Add Listobj
            tableobj.push(rowobj)   
        })   
        console.log ("tableobj", tableobj)
        return tableobj    
    }
    
    makeMeetingCardData() {
        if (this.state.selected_meeting_uuid) {
            let cardobj = {}
            let meetingobj = this.state.meetingobjlist.find(m => m.uuid === this.state.selected_meeting_uuid)
            let date = ""
            if (!meetingobj.suggested_date) {date = "no date"}
            else {date = new Date(meetingobj.suggested_date).toLocaleDateString()}
            cardobj.headline = meetingobj.type + " i " + meetingobj.organization.name + " - " + date
            cardobj.participants = []
            meetingobj.participants.forEach(participant => {
                let listobj = {}
                listobj.text = participant.person_pacov.name
                listobj.id = participant.person_pacov.uuid
                cardobj.participants.push(listobj)
            })
            cardobj.topics = []
            const orderedtopics = meetingobj.topics.sort((a, b) => a.listposition - b.listposition)
            orderedtopics.forEach(topic => {
                let listobj = {}
                listobj.text = topic.topic_pacov.name
                listobj.id = topic.listposition
                cardobj.topics.push(listobj)
            })

            return cardobj
        }
        return undefined
    }
   
    // Layout
    MainPageLayout = () => {
        return (
            <div>
                <Row>
                    <Col>
                        <MeetingsTable 
                            tabledata={this.makeTableData()} 
                            changeMeetingSelection={this.changeMeetingSelection}
                        />
                    </Col>
                    <Col>
                        <MeetingCard 
                            meetingcarddata={this.makeMeetingCardData()}
                            is_selected={this.state.selected_meeting_uuid ? true : false}
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

    // Layout
    NewMeetingRequestLayout() {
        console.log("Running new meeting request layout")
        return (
            <div>
                <MeetingRequestForm/>
            </div>
        )
    }

    render() {
        return (
            <div>
                <PrivateRoute exact path="/meetings" component={this.MainPageLayout} />
                <PrivateRoute exact path="/meetings/newmeetingrequest" component={this.NewMeetingRequestLayout} />
            </div>
        )
    }
}
