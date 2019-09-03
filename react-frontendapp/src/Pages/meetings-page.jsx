import React, { Component } from 'react';
import {Container} from 'react-bootstrap'

import { PrivateRoute } from '../_helpers/PrivateRoute'
import {productionService} from '../_services/production-service'
import {filterService} from '../_services/filter-service' 
import {PACOV_ID} from '../_helpers/lookup-table'

import Dashboard from '../Modes/meetings/dashboard'
import NewMeetingrequest from '../Modes/meetings/new-meetingrequest'

export default class MeetingsPage extends Component {

    state = {
        meetings: {},
        persons: {},
        selected_meeting_row: undefined
    }

    componentDidMount(){
        this.makeMeetingsListobj()
        this.makePersonsListobj()
    }

    // Construct special design meeting objects
    makeMeetingsListobj = () => {
        const {pacovs, userpacov, relations} = this.props
        const mymeetings = productionService.produceUserMeetings(relations, userpacov, pacovs) 
        this.setState({meetings: mymeetings}) 
    }

    makePersonsListobj  = () => {
        const {pacovs} = this.props
        const mypersons = filterService.filterPacovsByCategory(pacovs, PACOV_ID.PERSON) 
        this.setState({persons: mypersons}) 
    }

    // Callback for choosing selected meeting
    changeMeetingSelection = (row) => {
        this.setState({selected_meeting_row: row})
    }

    render() {
        return (
            <Container className="meetings-container">
                <PrivateRoute exact path="/meetings" component={(props) => <Dashboard {...props} 
                    meetings={this.state.meetings}
                    selected_meeting_row={this.state.selected_meeting_row}
                    changeMeetingSelection={this.changeMeetingSelection}
                />}/>
                <PrivateRoute exact path="/meetings/newmeetingrequest" component={(props) => <NewMeetingrequest {...props} 
                    category={this.props.category}
                    persons={this.state.persons}
                />}/>
            </Container>
        )
    }
}
