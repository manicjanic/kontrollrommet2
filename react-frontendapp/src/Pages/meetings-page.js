import React, { Component } from 'react';
import {Container} from 'react-bootstrap'

import { PrivateRoute } from '../_helpers/PrivateRoute'
import {ProductionService} from '../_services/production-service'

import Dashboard from '../Modes/meetings/dashboard'
import NewMeetingrequest from '../Modes/meetings/new-meetingrequest'

export default class MeetingsPage extends Component {

    state = {
        meetings: {},
        selected_meeting_uuid: ""
    }

    componentDidMount(){
        this.getMeetings()
    }

    getMeetings = () => {
        const {pacovs, userpacov, relations} = this.props
        const mymeetings = ProductionService.produceUserMeetings(relations, userpacov, pacovs) 
        this.setState({meetings: mymeetings}) 
    }

    // Callback for choosing selected meeting
    changeMeetingSelection = (uuid) => {
        this.setState({selected_meeting_uuid: uuid})
    }

    render() {
        return (
            <Container className="meetings-container">
                <PrivateRoute exact path="/meetings" component={(props) => <Dashboard {...props} 
                    meetings={this.state.meetings}
                    selected_meeting_uuid={this.state.selected_meeting_uuid}
                    changeMeetingSelection={this.changeMeetingSelection}
                />}/>
                <PrivateRoute exact path="/meetings/newmeetingrequest" component={(props) => <NewMeetingrequest {...props} 
                    meeting_scheme={this.state.meeting_scheme}
                    topics={this.state.topics}
                    persons={this.state.persons}
                />}/>
            </Container>
        )
    }
}
