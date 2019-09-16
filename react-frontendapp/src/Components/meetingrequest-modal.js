import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import MeetingCard from './meeting-card'

const MeetingRequestModal = (props) => {
    
    const makeMeetingCardData = () => {
        let cardobj = {}
        let meeting_type = props.scheme.inputfields[1].options.find(item => item.id == props.formdata.meeting_type)
        console.log("check", props.formdata)
        console.log("meeting type", meeting_type)
        let entity = props.selected_user_role.pacovB
        cardobj.headline = meeting_type.text + " i " + entity.name + " - " + props.formdata.suggested_meetingdate
        cardobj.participants = props.participants
        cardobj.topics = props.topics
        return cardobj
    }

    const handleClick = (e) => {
        if (e.target.name === "sendrequest") {props.handleSubmit(e)}
        props.setDisplay_modal(false)
    }
    
    return (
        <Modal show={props.display_modal} onHide={handleClick}>
        <Modal.Header closeButton>
          <Modal.Title>Meeting Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <MeetingCard
                meetingcarddata={makeMeetingCardData()}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" name="savedraft" onClick={handleClick}>
            Save Draft
          </Button>
          <Button variant="primary" name="sendrequest" onClick={handleClick}>
            Send Request
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default MeetingRequestModal