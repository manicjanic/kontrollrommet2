import React, { Component } from 'react';
import {filterService} from '../_services/filter-service'
import {Row, Col, Container} from 'react-bootstrap'

import MeetingList from './MeetingList';
import MeetingCard from './MeetingCard';

class Meetings extends Component {
  
    constructor(props){
        super(props);
        // Set Local State
        this.state = {
            selected_Meeting: {nodata: true}
        }
        // Bind functions so they can access this
        this.findMyMeetings = this.findMyMeetings.bind(this);
        this.findMeetingCardData = this.findMeetingCardData.bind(this);
        this.onSelectMeeting = this.onSelectMeeting.bind(this);
    }
    
    onSelectMeeting(id) {
        let selected_meeting = filterService.findOnId(id, this.findMyMeetings())
        selected_meeting.nodata = false
        this.setState({selected_Meeting: selected_meeting})
    }

    findMyMeetings() {
        const meeting_calls = filterService.findPepparsByType(this.props.my_Peppars, 4)
        const all_meetings = meeting_calls
        return all_meetings
    }

    findMeetingCardData() {
        if (!this.state.selected_Meeting.nodata) {
            console.log("running findMeetingCardData")
            const meeting = this.state.selected_Meeting
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
            <Container fluid={true}>
                <Row>
                    <Col>
                        <MeetingList 
                            my_Meetings={this.findMyMeetings()}
                            onSelectMeeting={this.onSelectMeeting}
                        />
                    </Col>
                    <Col>
                        <MeetingCard
                            meetingcarddata ={this.findMeetingCardData()}
                            selected_meeting = {this.state.selected_Meeting}
                        />
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}
   
export default Meetings;
