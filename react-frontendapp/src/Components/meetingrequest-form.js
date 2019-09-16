// React Modules
import React, { useState } from 'react';
import Form from '../_components/Form'

// Meeting Request Form Component
const MeetingRequestForm = (props) => {
    // Gather Props
    const {meeting_category} = props
    // Component state
    const [formdata, setFormdata] = useState({})
        
    // Handle changes in form values
    const updateValue = (e) => { 
        e.persist();
        const value = e.target.value
        setFormdata(prevState => ({...prevState, [e.target.name]: value})) 
    }  
    
    // Handle Submit form
    const handleSubmit =  () => {
        props.handleEvent({
            componentid: "meetingrequest-form",
            action: "store-data",
            data: formdata
        })
    }
   
    // Construct formsetupobj
    let formsetupobj = {
        validation: true,
        formname: "meetingrequest-form",
        inputfields: meeting_category.scheme.inputfields
    }
    
    return (
        <div>
            <Form
                formsetupobj={formsetupobj}
                formdata={formdata}
                updateValue={updateValue}
                handleSubmit={handleSubmit}
            />
        </div>
    ); 
}

export default MeetingRequestForm