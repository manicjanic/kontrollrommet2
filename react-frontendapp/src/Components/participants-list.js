import React from 'react';
import {List} from '../_components/List'
import {Row, Col} from 'react-bootstrap'
 
const ParticipantList = (props) => {
    let {selected, unselected} = props
    console.log("participants and selecteds", selected, unselected)
    
    return (
        <div>
            <Row>
                <Col>
                    <h4>Chosen Participants:</h4>
                    <List.Unordered
                        displayobj={selected} 
                        handleClick={props.handleClickOnSelected}
                    />
                </Col>
                <Col>
                    <h4>Possible Participants:</h4>
                    <List.Unordered
                        displayobj={unselected}
                        handleClick={props.handleClickOnUnselected}
                    />
                </Col>
            </Row>
        </div>
    );
};
 
export default ParticipantList;