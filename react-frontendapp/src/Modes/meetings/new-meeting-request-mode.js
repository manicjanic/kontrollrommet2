// React Modules
import React, { Component } from 'react';
// React Bootstrap elements
import {Button} from 'react-bootstrap'
// Helpers and Services
import {dataService} from '../../_services/data-service'
import {PACOV_ID, RELATION_ID} from '../../Hardcoded/lookup-table'
// Specific components
import MeetingRequestForm from '../../Components/meetingrequest-form'
import MeetingRequestModal from '../../Components/meetingrequest-modal'
import ParticipantsList from '../../Components/participants-list'
import MeetingTopicsList from '../../Components/topics-list'

// New Meeting Request Mode Component
export default class NewMeetingRequestMode extends Component {
    // Mode State
    state = {
        //Meeting Pacov being made
        new_meeting: {},
        //Mode Status
        display_modal: false,
    }

    // Universal Event Handler for Mode Level clicks
    handleModeLevelClicks = (e) => {
        const {id, value} = e.target
        switch (id) {
            case ("makedocument-button"):
                this.openModal()
                break;
            case ("submit-button"):
                this.attemptCreateNewMeeting()
                break;
            default:
                // no option
        }

    }

    // Universal Event Handler for Child Component Event
    handleChildLevelEvent = (componentevent) => {
        const {componentid, action, data} = componentevent
        console.log("Receiving event" ,componentid, action, data)
        switch (componentid) {
            case ("meetingrequest-form"):
                switch (action) {
                    case ("store-data"):
                        this.storeFormData(data)
                        break;
                    default:
                    // no action
                }
                break;
            case ("meetingrequest-modal"):
                switch (action) {
                    case ("submit-data"):
                        this.attemptCreateNewMeeting(data)
                        break;
                    default:
                    // no action
                }
                break;    
            default:
                // no option
        }
    }
    
    // Routine for Opening Modal
    openModal(){
        this.setState({display_modal: true})
    }

    storeFormData(data) {
        let new_meeting = {}
        
    }

    // Routine for Attempt Create New Pacov Cascade, Meeting
    attemptCreateNewMeeting = async (formdata, selections) => {
        // Construct a proper Request object
        let request = {
            category: PACOV_ID.REQUEST,
            started: new Date(),
            specific_data: JSON.stringify({})
        }
        // Construct a proper Meeting object
        let meeting = {
            category: PACOV_ID.MEETING,
            specific_data: JSON.stringify({
                suggested_meetingdate: formdata.suggested_meetingdate,
                meeting_type: formdata.meeting_type
            })
        }
        // Post objects
        console.log("Submitting", request, meeting)
        let request_response = await dataService.postDataAuth("api/user/pacov/register", request)
        let meeting_response = await dataService.postDataAuth("api/user/pacov/register", meeting)
        // Construct Relations
        let sendlist = []
        let request_event_relation = {
            type: RELATION_ID.EVENT_IN_QUESTION,
            pacovA: meeting_response.uuid, 
            pacovB: request_response.uuid
        }
        sendlist.push(request_event_relation)
        let inviter_relation = {
            type: RELATION_ID.INVITER, 
            pacovA: this.props.user_pacov.uuid, 
            pacovB: request_response.uuid
        }
        sendlist.push(inviter_relation)
        selections.persons.forEach(person => {
            let request_relation = {
                type: RELATION_ID.INVITEE,
                pacovA: request_response.uuid,
                pacovB: person.id
            }
            let event_relation = {
                type: RELATION_ID.PARTICIPANT,
                pacovA: meeting_response.uuid,
                pacovB: person.id
            }
            sendlist.push(request_relation)
            sendlist.push(event_relation)
        })
        selections.topics.forEach(topic => {
            let request_relation = {
                type: RELATION_ID.REQUEST_TOPIC,
                pacovA: request_response.uuid,
                pacovB: topic.id
            }
            let event_relation = {
                type: RELATION_ID.MEETING_TOPIC,
                pacovA: meeting_response.uuid,
                pacovB: topic.id
            }
            sendlist.push(request_relation)
            sendlist.push(event_relation)
        })

        console.log("sendlist", sendlist)
        let response = await dataService.postDataAuth("api/user/relation/register", sendlist)
        console.log(response)
    }

    // JSX-Element
    renderMeetingRequestForm = () => (
        <MeetingRequestForm 
            meeting_category={this.props.meeting_category}
            handleEvent={this.handleChildLevelEvent}
        />   
    )

    // JSX-Element
    renderParticipantsList = () => (
        <ParticipantsList 
            all_persons={this.props.all_persons}
        />   
    )

    // JSX-Element
    renderMeetingTopicsList = () => (
        <MeetingTopicsList 
            all_topics={this.props.all_topics}
        />   
    )

    // JSX-Element
    renderMeetingRequestModal = () => (
        <MeetingRequestModal/>   
    )

    // JSX-Element
    renderMakeDocumentButton = () => (
        <Button id="makedocument-button" onClick={this.handleClickOnMakeDocument}>Make Document</Button>
        )
 
    render() {
        return (
            <div>
                {this.renderMeetingRequestForm()}
                {this.renderParticipantsList}
                {this.renderMeetingTopicsList()}
                {this.renderMakeDocumentButton()}
                {this.state.display_modal? this.renderMeetingRequestModal() : ""}
            </div>
        )
    }
}