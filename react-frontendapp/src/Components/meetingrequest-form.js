import React from 'react';
import Form from '../_components/Form'

const MeetingRequestForm = (props) => {

    const formsetupobj = {
        inputfields: [{
            label: "Suggested Meetingdate:",
            type: "date",
            options: undefined,
            formdatakey: "suggeste_meetingdate",
            },{
            label: "Meetingtype:",
            type: "select",
            options: props.meetingtypes,
            formdatakey: "meetingtype",
        }],
        buttons: [{
            text: "Make Document",
            type: "submit"
        }],
        layoutinfo: undefined
    }
    
    return (
        <div>
            <Form
                handleSubmit={props.handleSubmit}
                updateValue={props.updateValue}
                formsetupobj={formsetupobj}
                formdataobj={props.formdata}
            />
        </div>
    ); 
}

export default MeetingRequestForm