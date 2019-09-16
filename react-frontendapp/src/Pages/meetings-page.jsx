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
        meeting_category: {},
        // Page Specific constructed objects
        all_meetings_enhanced: {},
        // Page Specific Selection status
        selected_meeting_row: undefined,
    }   

    // Lifecycle hook - Setting state as the component loads
    componentDidMount() {this.setInitialState()}

    // Set Page State based on props from Central State
    setInitialState() {
        let {pacovs, relations, category} = this.props
        this.setState({
            all_persons: filterService.filterPacovsByCategory(pacovs, PACOV_ID.PERSON),
            all_topics: filterService.filterPacovsByCategory(pacovs, PACOV_ID.TOPIC),
            all_meetings_enhanced: constructionService.makeEnhancedMeetingObjList(pacovs, relations),
            meeting_category: filterService.findPacovCategory(category, PACOV_ID.MEETING)
        })
    }
    
    // Changes selected meeting
    changeMeetingSelection = (row) => {
        this.setState({selected_meeting_row: row})
    }

    render() {
        // Gather Props and State
        let {all_meetings_enhanced, selected_meeting_row, all_persons, all_topics} = this.state
        let {selected_user_role, category, user_pacov} = this.props
        return (
            <Container className="meetings-container">
                <PrivateRoute exact path="/meetings" component={(props) => <DashboardMode {...props} 
                    meetings={all_meetings_enhanced}
                    selected_meeting_row={selected_meeting_row}
                    changeMeetingSelection={this.changeMeetingSelection}
                />}/>
                <PrivateRoute exact path="/meetings/newmeetingrequest" component={(props) => <NewMeetingRequestMode {...props} 
                    user_pacov={user_pacov}
                    selected_user_role={selected_user_role}
                    category={category}
                    all_persons={all_persons}
                    all_topics={all_topics}
                />}/>
            </Container>
        )
    }
}
