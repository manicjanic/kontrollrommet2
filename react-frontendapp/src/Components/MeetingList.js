import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const MeetingList = (props) => {  
    
    const List = (props) => {
            return props.my_Meetings.map((meeting, i) => {
                return <Item meeting={meeting} key={i} />;
            })
    }

    const Item = (props) => {
        return (
            <tr>
                <td>{props.meeting.peppar_name}</td>
                <td></td>
                <td>{props.meeting.added_data.peppar_dateA}</td>
            </tr>
        )
    }

    return (
        <div className="container">
            <h3>Meeting List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Organisasjon</th>
                        <th>Dato</th>
                    </tr>
                </thead>
                <tbody>
                <List my_Meetings={props.my_Meetings}/>
            </tbody>
        </table>
    </div>
    )
    
}

export default MeetingList