import React, { Component } from 'react';
import {filterService} from '../_services/filter-service'
import {Row, Col, Container} from 'react-bootstrap'
import { PrivateRoute } from '../_components';
import { withRouter } from 'react-router'


import MeetingList from './MeetingList';
import MeetingCard from './MeetingCard';
import MeetingRunner from './MeetingRunner';

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
        this.onStartMeeting = this.onStartMeeting.bind(this);
    }
    
    // Callbak functions
    onSelectMeeting(id) {
        let selected_meeting = filterService.findOnId(id, this.findMyMeetings())
        selected_meeting.nodata = false
        this.setState({selected_Meeting: selected_meeting})
    }

    onStartMeeting(id) {
        console.log("Clicked button", id)
        this.makeNewPepparObject()
        this.props.history.push('/meetings/runmeeting')
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
            let headline = meeting.peppar_name
            let id = meeting.id
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
                headline: headline,
                id: id
            }
            console.log("returning this meeting object", meetingobject)
            return meetingobject
        }
        return undefined
    }

    makeNewPepparObject() {
        let selected_meeting = this.state.selected_Meeting
        let new_actionobj = {}
        new_actionobj.peppar_type = 6
        new_actionobj.peppar_nameA = "Avvikling av"
        new_actionobj.peppar_nameB = selected_meeting.peppar_nameB
        new_actionobj.peppar_dateA = new Date()

        let new_peppars = this.props.getState("new_Peppars")
        let id = new_peppars.length
        new_actionobj.id = id+1
        new_peppars.push(new_actionobj)
        this.props.modifyState({new_Peppars: new_peppars})

        let new_relationobj = {}
        new_relationobj.relation_type = 10
        extract = 
    }
    
    // Layouts for differend page setups
    MainPageLayout = () => (
            <Row>
                <Col>
                    <MeetingList 
                        my_Meetings={this.findMyMeetings()}
                        onSelectMeeting={this.onSelectMeeting}
                    />
                </Col>
                <Col>
                    <MeetingCard
                        meetingcarddata = {this.findMeetingCardData()}
                        selected_meeting = {this.state.selected_Meeting}
                        onStartMeeting = {this.onStartMeeting}
                    />        
                </Col>
            </Row>
    );
 
    MeetingRunnerLayout = () => (
        <Row>
            <MeetingRunner
            />
        </Row>
    )

    render() {
        return (
            <Container fluid={true}>
                <PrivateRoute exact path="/meetings/" component={this.MainPageLayout} />
                <PrivateRoute path="/meetings/runmeeting" component={this.MeetingRunnerLayout} />
            </Container>
        )
    }
}
   
export default withRouter(Meetings);
