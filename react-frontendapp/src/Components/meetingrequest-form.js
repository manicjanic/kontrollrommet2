import React from 'react';
import Form from '../_components/Form'

const MeetingRequestForm = (props) => {

    const makeFormsetupobj = () => {
        let formsetupobj = {}
        formsetupobj.inputfields = props.scheme.inputfields
        return formsetupobj
    }
    
    return (
        <div>
            <Form
                handleSubmit={props.handleSubmit}
                updateValue={props.updateValue}
                formsetupobj={makeFormsetupobj()}
                formdataobj={props.formdata}
            />
        </div>
    ); 
}

export default MeetingRequestForm