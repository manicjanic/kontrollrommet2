import React from 'react';
import {List} from '../_components/List'
import {Row, Col} from 'react-bootstrap'
 
const MeetingTopicsList = (props) => {
    let {selected, unselected} = props
    console.log("participants and selecteds", selected, unselected)
    
    return (
        <div>
            <Row>
                <Col>
                    <h4>Chosen Topics:</h4>
                    <List.Unordered
                        displayobj={selected} 
                        handleClick={props.handleClickOnAnyList}
                        name="selected-topics"

                    />
                </Col>
                <Col>
                    <h4>Possible Topics:</h4>
                    <List.Unordered
                        displayobj={unselected}
                        handleClick={props.handleClickOnAnyList}
                        name="unselected-topics"
                    />
                </Col>
            </Row>
        </div>
    );
};
 
export default MeetingTopicsList;