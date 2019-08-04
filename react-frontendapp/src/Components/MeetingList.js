import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const MeetingList = (props) => {  
    
    const List = () => {
            return props.meetings.map((meeting, i) => {
                return <Item meeting={meeting} key={i} />;
            })
    }

    const Item = () => {
        return (
            <tr>
                <td>{props.meeting.type.name}</td>
                <td>{props.meeting.entitiy.name}</td>
                <td>{props.meeting.date}</td>
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
                { List() }
            </tbody>
        </table>
    </div>
    )
    
}

export default MeetingList