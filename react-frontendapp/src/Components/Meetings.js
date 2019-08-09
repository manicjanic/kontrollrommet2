import React, { Component } from 'react';
import {filterService} from '../_services/filter-service'
import {Table, ListGroup, ListGroupItem, Row, Col, Tab, Nav, Container} from 'react-bootstrap'

import MeetingList from './MeetingList';
import MeetingCard from './MeetingCard';

class Meetings extends Component {
  
    constructor(props){
        super(props);
        // Set Local State
        this.state = {
            my_MeetingCalls: filterService.findPepparsByType(this.props.my_Peppars, 4),
            selected_Meeting: {nodata: true}
        }
        // Bind functions so they can access this
        this.getMeetingCardData = this.getMeetingCardData.bind(this);
        this.onSelectMeeting = this.onSelectMeeting.bind(this);
    }
    
    onSelectMeeting(id) {
        let selected_meeting = filterService.findOnId(id, this.state.my_MeetingCalls)
        selected_meeting.nodata = false
        this.setState({selected_Meeting: selected_meeting})
    }

    getMeetingCardData() {
        if (!this.state.selected_Meeting.nodata) {
            console.log("running getMeetingCardData")
            let meeting = this.state.selected_Meeting
            let relations = filterService.findRelationsFromPeppar(this.props.all_Relations, meeting)
            let inviter_relations = filterService.findRelationsByType(relations, 3)
            let inviter = filterService.findOtherEnd(inviter_relations[0], this.props.all_Peppars, meeting)
            let inviteds_relations = filterService.findRelationsByType(relations, 4)
            let inviteds = inviteds_relations.map(relation => {
                return filterService.findOtherEnd(relation, this.props.all_Peppars, meeting)
            })
            let exec_entity_relations = filterService.findRelationsByType(relations, 5)
            let exec_entity = filterService.findOtherEnd(exec_entity_relations[0], this.props.all_Peppars, meeting)
            let agenda_points_relations = filterService.findRelationsByType(relations, 6)
            let agenda_points = agenda_points_relations.map(relation => {
                return filterService.findOtherEnd(relation, this.props.all_Peppars, meeting)
            })
            let meetingobject = {
                inviter: inviter,
                inviteds: inviteds,
                exec_entity: exec_entity,
                agenda_points: agenda_points,
                headline: meeting.peppar_name
            }
            console.log("returning this meeting object", meetingobject)
            return meetingobject
        }
        return undefined
    }
    
    
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h3>Meeting List</h3>
                        <MeetingList 
                            my_MeetingCalls={this.state.my_MeetingCalls}
                            onSelectMeeting={this.onSelectMeeting}
                        />
                    </Col>
                    <Col>
                        <h3>Info</h3>
                        <MeetingCard
                            meetingcarddata ={this.getMeetingCardData()}
                            selected_meeting = {this.state.selected_Meeting}
                        />
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}
   
export default Meetings;
