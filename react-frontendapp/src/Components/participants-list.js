import React, {useState, useEffect} from 'react';
import {List} from '../_components/List'
import {Row, Col} from 'react-bootstrap'
 

const swappablesetup = {
    listnames: ['participants', 'topics']
}

const ParticipantsList = (props) => {
    // Gather Props
    const  {all_persons} = props
    // Define Component state
    const [swappablelist, setSwappablelist] = useState({
        [swappablesetup.listnames[0]]: {selected: [], unselected: makePacovsDisplayList(all_persons, "name", "uuid")}
    })
    // Construct data for display
    function makePacovsDisplayList(pacovs, textkey, idkey, valuekey) {
        let resultlist = []
        for (let key in pacovs) {
            let pacov = pacovs[key]
            let obj = {text: pacov[textkey], id: pacov[idkey], value: pacov[valuekey]}
            resultlist.push(obj)   
        }
        return resultlist       
    }

    const moveListItem = (value, action, listname=swappablesetup.listnames[0]) => {
        let list = swappablelist[listname]
        if (action === "add") {
            let selected_item = list.unselected.splice(value, 1)
            list.selected.push(selected_item[0])
        }
        if (action === "remove") {
            let selected_item = list.selected.splice(value, 1)
            list.unselected.push(selected_item[0])
        }
        setSwappablelist({[listname]: {selected: list.selected, unselected: list.unselected}})
    } 

    const handleClickOnListItem = (e) => {
        const {value, id, className} = e.target
        console.log("position of clicked:", className, value, id)
        let operator = ""
        let list = ""
        switch (className) {
            case ("unselected-"+swappablesetup.listnames[0]):
                operator = "add"
                list = swappablesetup.listnames[0]
                break;
            case "selected-"+swappablesetup.listnames[0]:
                    operator = "remove"
                    list = swappablesetup.listnames[0]
                    break;
            default:
                // no option
        }
        moveListItem(value, operator, list) 
    }


    return (
        <div>
            <Row>
                <Col>
                    <h4>Chosen Participants:</h4>
                    <List.Unordered
                        displayobj={swappablelist[swappablesetup.listnames[0]].selected} 
                        handleClick={handleClickOnListItem}
                        name={"selected-" + swappablesetup.listnames[0]}
                    />
                </Col>
                <Col>
                    <h4>Possible Participants:</h4>
                    <List.Unordered
                        displayobj={swappablelist[swappablesetup.listnames[0]].selected}
                        handleClick={handleClickOnListItem}
                        name={"unselected-" + swappablesetup.listnames[0]}
                    />
                </Col>
            </Row>
        </div>
    );
};
 
export default ParticipantsList;