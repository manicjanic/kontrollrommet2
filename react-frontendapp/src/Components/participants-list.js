import React from 'react';
import {List} from '../_components/List'
import {Row, Col} from 'react-bootstrap'
 
const ParticipantList = (props) => {
    let {participants, selecteds} = props
    console.log("participants and selecteds", participants, selecteds)
    
 
    return (
        <div>
            <Row>
                <Col>
                    <h4>Chosen Participants:</h4>
                    <List.Unordered
                        displayobj={selecteds} 
                        handleClick={props.handleClickSelecteds}
                    />
                </Col>
                <Col>
                    <h4>Possible Participants:</h4>
                    <List.Unordered
                        displayobj={participants}
                        handleClick={props.handleClickParticipants}
                    />
                </Col>
            </Row>
        </div>
    );
};
 
export default ParticipantList;