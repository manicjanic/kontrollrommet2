import React, { useState }  from 'react';
import {Card} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

const MeetingCard = (props) => {
    console.log("running MeetingCard with this data", props.meetingcarddata)    
    
    const Inviteds = (props) => {
        if (props.meetingcarddata) {
            return props.meetingcarddata.inviteds.map((invited) => {
                return <div>{invited.peppar_name}, </div>
            })
        }
        return ""    
    }

    const Topics = (props) => {
        if (props.meetingcarddata) {
            return props.meetingcarddata.inviteds.map((invited) => {
                return <div>{invited.peppar_name}, </div>
            })
        }
        return ""    
    }

    return (
        <Card>
            <h2>{props.meetingcarddata.headline}</h2>
            <br/>
            Inviterte:
            <Inviteds
                meetingcarddata={props.meetingcarddata}
            />
            <br/>
            <Topics
                meetingcarddata={props.meetingcarddata}
                />
                
        </Card>
    )

}

export default MeetingCard