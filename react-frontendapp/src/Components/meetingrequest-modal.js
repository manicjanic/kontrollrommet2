import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import MeetingCard from './meeting-card'

const MeetingrequestModal = (props) => {
    
    const makeMeetingCardData = () => {
        let cardobj = {}
        cardobj.headline = props.formdata.meeting_type + " - " + props.formdata.suggested_meetingdate
        cardobj.participants = props.participants
        cardobj.topics = props.topics
        return cardobj
    }


    const handleClick = (e) => {
        if (e.target.name === "sendrequest") {props.handleSubmit(e)}
        props.setModal(false)
    }
    
    return (
        <Modal show={props.showmodal} onHide={handleClick}>
        <Modal.Header closeButton>
          <Modal.Title>Meeting Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <MeetingCard
                meetingcarddata={makeMeetingCardData()}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" name="savedraft" onClick={handleClick}>
            Close
          </Button>
          <Button variant="primary" name="sendrequest" onClick={handleClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default MeetingrequestModal