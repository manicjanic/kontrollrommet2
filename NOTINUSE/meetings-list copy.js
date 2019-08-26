import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next'
import {Table} from 'react-bootstrap'

const MeetingList = (props) => {  
    
    // Static data for display
    const tablehead = [
        {text: "Møter:"}    ]

    
    // JSX Elements
    const MainTable = (props) => {
        return props.meetinglist.map((meeting) => {
            console.log("Meeting", meeting)
            return <TableRow 
                meeting={meeting}
            />;
        })
    }

    const TableRow = (props) => {
        return (
            <tr key={props.meeting.uuid} value={props.meeting.uuid}>
                <td>{props.meeting.text}</td>
            </tr>
        )
    }

    return (
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>{tablehead[0].text}</th>
                </tr>
            </thead>
                <tbody>
                    <MainTable 
                        meetinglist={props.meetinglist}
                    />
                </tbody>
            </Table>
    )
    
}

export default MeetingList