import React from 'react';
import {Table} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

const MeetingList = (props) => {  
    
    // Static data for display
    const TABLEHEAD = [
        {text: "Møter:"}    ]

    
    // Layout Element
    const MainTable = (props) => {
        return props.my_Meetings.map((meeting, i) => {
            return <TableRow 
                meeting={meeting}
                key={i}
                onSelectMeeting={props.onSelectMeeting}
            />;
        })
    }

    const TableRow = (props) => {
        return (
            <tr onClick={() => rowClick(props.meeting.id)}>
                <td>{props.meeting.peppar_name}</td>
                <td>{props.meeting.peppar_dateA}</td>
            </tr>
        )
    }

    // Event Handlers
    const rowClick = (id) => {
        console.log("Clicked", id)
        props.onSelectMeeting(id)
    }

    return (
        <div className="container">
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>{TABLEHEAD[0].text}</th>
                </tr>
            </thead>
                <tbody>
                    <MainTable 
                        my_Meetings={props.my_Meetings}
                        setMeetingCard={props.setMeetingCard}
                    />
                </tbody>
            </Table>
        </div>
    )
    
}

export default MeetingList