import React, { Component } from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { PrivateRoute } from '../_components';
import {ConstructionService} from '../_services/construction-service'

import MeetingRequestForm from "../Components/meetingrequest-form"
import MeetingList from "../Components/meetings-list"
import MeetingCard from "../Components/meeting-card"

export default class MeetingsPage extends Component {

    state = {
        meetingobjlist: ConstructionService.constructMeetingObjList(this.props.pacovs, this.props.relations)
    }

    //Make derived data from State
    makeListContent() {
        let listobj_list = []
        this.state.meetingobjlist.forEach((meetingobj) => {
            // Constuct Listobj
            let listobj = {}
            let date = new Date(meetingobj.suggested_date)
            listobj.text = meetingobj.type + " i " + meetingobj.organization.name + ", " + date.toLocaleDateString()
            if (meetingobj.status === "DRAFT") {
                listobj.text += " (Draft)"
            }
            listobj.value = meetingobj.uuid
            // Add Listobj
            listobj_list.push(listobj)   
        })   
        console.log ("listobjlist", listobj_list)
        return listobj_list    
    }
    
    makeMeetingCardData() {
        return ""
    }
    MainPageLayout = () => {
        return (
            <div>
                <Row>
                    <Col>
                        <MeetingList meetinglist={this.makeListContent()} />
                    </Col>
                    <Col>
                        <MeetingCard meetingcarddata={this.makeMeetingCardData()}/>
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
