// React Modules
import React, {Component} from 'react';
// React Bootstrap Elements
import {Container} from 'react-bootstrap'
// Helpers and Services
import {PrivateRoute} from '../_helpers/PrivateRoute'
import {dataService} from '../_services/data-service'
import {constructionService} from '../_services/construction-service'
// Mode Components
import Dashboard from '../Modes/meetings/dashboard'
import NewMeetingrequest from '../Modes/meetings/new-meetingrequest'

// Meeting Page Component
export default class MeetingsPage extends Component {
    // Page State
    state = {
        // Collections of specific Pacovs by Category. Used in the Meeting Page
        all_persons: {},
        all_topics: {},
        all_meetings_enhanced: {},
        // Scheme
        defaultscheme_meeting: {},
        // Selection status
        selected_meeting_row: undefined
    }   

    // Get State variables upon mounting
    componentDidMount(){
        let {pacovs, relations} = this.props
        this.setState({
            all_persons: dataService.getLocal_all_persons(pacovs),
            all_topics: dataService.getLocal_all_topics(pacovs),
            all_meetings_enhanced: constructionService.makeEnhancedMeetingObjList(pacovs, relations)
        })
    }

    // Callback for choosing selected meeting
    changeMeetingSelection = (row) => {
        this.setState({selected_meeting_row: row})
    }

    render() {
        return (
            <Container className="meetings-container">
                <PrivateRoute exact path="/meetings" component={(props) => <Dashboard {...props} 
                    meetings={this.state.all_meetings_enhanced}
                    selected_meeting_row={this.state.selected_meeting_row}
                    changeMeetingSelection={this.changeMeetingSelection}
                />}/>
                <PrivateRoute exact path="/meetings/newmeetingrequest" component={(props) => <NewMeetingrequest {...props} 
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