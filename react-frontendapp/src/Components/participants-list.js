import React from 'react';
import {List} from '../_components/List'
import {Row, Col} from 'react-bootstrap'
 
const MeetingPersonsList = (props) => {
    let {selected, unselected} = props
    console.log("participants and selecteds", selected, unselected)
    
    return (
        <div>
            <Row>
                <Col>
                    <h4>Chosen Participants:</h4>
                    <List.Unordered
                        displayobj={selected} 
                        handleClick={props.handleClickOnAnyList}
                        name="selected-participants"
                    />
                </Col>
                <Col>
                    <h4>Possible Participants:</h4>
                    <List.Unordered
                        displayobj={unselected}
                        handleClick={props.handleClickOnAnyList}
                        name="unselected-participants"
                    />
                </Col>
            </Row>
        </div>
    );
};
 
export default MeetingPersonsList;