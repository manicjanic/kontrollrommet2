// React Modules
import React, {Component} from 'react';
// React Bootstrap Elements
import {Container} from 'react-bootstrap'
// Helpers and Services
import {PrivateRoute} from '../_helpers/PrivateRoute'
import {constructionService} from '../_services/construction-service'
import {filterService} from '../_services/filter-service'
import {PACOV_ID, RELATION_ID} from '../Hardcoded/lookup-table'
// Mode Components
import DashboardMode from '../Modes/meetings/dashboard-mode'
import NewMeetingRequestMode from '../Modes/meetings/new-meeting-request-mode'

// Meeting Page Component
export default class MeetingsPage extends Component {
    // Page State
    state = {
        // Filtered Pacovs and Relations for Page Use
        all_persons: {},
        all_topics: {},
        // Page Specific constructed objects
        all_meetings_enhanced: {},
        // Page Specific Selection status
        selected_meeting_row: undefined,
    }   

    componentDidMount() {this.setInitialState()}

    // Set Page State based on props from Central State
    setInitialState() {
        let {pacovs, relations} = this.props
        this.setState({
            all_persons: filterService.filterPacovsByCategory(pacovs, PACOV_ID.PERSON),
            all_topics: filterService.filterPacovsByCategory(pacovs, PACOV_ID.TOPIC),
            all_meetings_enhanced: constructionService.makeEnhancedMeetingObjList(pacovs, relations)
        })
    }
    
    // Set selected meeting in Page State
    changeMeetingSelection = (row) => {
        this.setState({selected_meeting_row: row})
    }

    render() {
        return (
            <Container className="meetings-container">
                <PrivateRoute exact path="/meetings" component={(props) => <DashboardMode {...props} 
                    meetings={this.state.all_meetings_enhanced}
                    selected_meeting_row={this.state.selected_meeting_row}
                    changeMeetingSelection={this.changeMeetingSelection}
                />}/>
                <PrivateRoute exact path="/meetings/newmeetingrequest" component={(props) => <NewMeetingRequestMode {...props} 
                    user_pacov={this.props.user_pacov}
                    selected_user_role={this.props.selected_user_role}
                    category={this.props.category}
                    persons={this.state.all_persons}
                    topics={this.state.all_topics}
                />}/>
            </Container>
        )
    }
}
