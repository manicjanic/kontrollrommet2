import React, { Component } from 'react';
import {Button, Container} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { PrivateRoute } from '../_components';

import MeetingRequestForm from "../Components/meetingrequest-form"

export default class MeetingsPage extends Component {
    MainPageLayout() {
        return (
            <div>
                <LinkContainer to="/meetings/newmeetingrequest">
                    <Button variant="primary">New Meeting Request</Button>
                </LinkContainer>
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
                <Container>
                    <PrivateRoute exact path="/meetings" component={this.MainPageLayout} />
                    <PrivateRoute exact path="/meetings/newmeetingrequest" component={this.NewMeetingRequestLayout} />
                </Container>
            </div>
        )
    }
}
