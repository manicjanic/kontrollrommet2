import React, { useState }  from 'react';
import {Table} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

const MeetingList = (props) => {  
    
    // Static data for display
    const tablehead = [
        {text: "Overskrift"},
        {text: "Dato"}
    ]

    // Defining state. Selected = id from selected in selection menu
    const [tablestatus, setTablestatus] = useState({
        row_selected: {},
    })
    
    // JSX Elements
    const MainTable = (props) => {
        return props.my_MeetingCalls.map((meeting, i) => {
            return <Table_Row 
                meeting={meeting}
                key={i}
                onSelectMeeting={props.onSelectMeeting}
            />;
        })
    }

    const Table_Row = (props) => {
        return (
            <tr onClick={() => rowClick(props.meeting.id)}>
                <td>{props.meeting.peppar_name}</td>
                <td>{props.meeting.added_data.peppar_dateA}</td>
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
                    <th>{tablehead[0].text}</th>
                    <th>{tablehead[1].text}</th>
                </tr>
            </thead>
                <tbody>
                    <MainTable 
                        my_MeetingCalls={props.my_MeetingCalls}
                        setMeetingCard={props.setMeetingCard}
                    />
                </tbody>
            </Table>
        </div>
    )
    
}

export default MeetingList