// React Modules
import React, {Component} from 'react';
// React Bootstrap Elements
import {Button, Row, Col} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
// Specific Components
import MeetingsTable from "../../Components/meetings-table"
import MeetingCard from "../../Components/meeting-card"

// Dashboard Mode Component
export default class DashboardMode extends Component {

    render () {
        return (
            <div>
                <Row>
                    <Col>
                        <MeetingsTable 
                            meetings={this.props.meetings} 
                            changeMeetingSelection={this.props.changeMeetingSelection}
                        />
                    </Col>
                    <Col>
                        {this.props.selected_meeting_row?
                            <MeetingCard
                                meetings={this.props.meetings} 
                                is_selected={this.props.selected_meeting_row_uuid ? true : false}
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
}

