import React, { useState } from 'react';
import {Button} from 'react-bootstrap'

import {filterService} from '../../_services/filter-service'
import {PACOV_ID, RELATION_ID} from '../../Hardcoded/lookup-table'
import {dataService} from '../../_services/data-service'

import MeetingRequestForm from '../../Components/meetingrequest-form'
import MeetingrequestModal from '../../Components/meetingrequest-modal'
import MeetingPersonsList from '../../Components/participants-list'
import MeetingTopicsList from '../../Components/topics-list'

// Layout
const NewMeetingRequest = (props) => {
    // Set local state
    const [formdata, setFormdata] = useState({})
    const [scheme, setScheme] = useState(filterService.findPacovCategory(props.category, PACOV_ID.MEETING).defaultscheme)    
    const [persons, setPersons] = useState({
        selected: [],
        unselected: makePacovsDisplayList(props.persons, "name", "uuid")
    })
    const [topics, setTopics] = useState({
        selected: [],
        unselected: makePacovsDisplayList(props.topics, "headline", "uuid")
    })
    // Display status
    const [display_modal, setDisplay_modal] = useState(false);

    function makePacovsDisplayList (pacovs, textkey, idkey, valuekey) {
        let resultlist = []
        for (let key in pacovs) {
            let pacov = pacovs[key]
            let obj = {text: pacov[textkey], id: pacov[idkey], value: pacov[valuekey]}
            resultlist.push(obj)   
        }
        return resultlist       
    }

    const moveItem = (value, action, name) => {
        let list = {}
        if (name === "participants") {list = persons}
        if (name === "topics") {list = topics}
        if (action === "add") {
            let selected_item = list.unselected.splice(value, 1)
            list.selected.push(selected_item[0])
        }
        if (action === "remove") {
            let selected_item = list.selected.splice(value, 1)
            list.unselected.push(selected_item[0])
        }
        if (name === "participants") {setPersons({selected: list.selected, unselected: list.unselected})} 
        if (name === "topics") {setTopics({selected: list.selected, unselected: list.unselected})}    
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Construct a proper Request meeting object
        let invite = {
            category: PACOV_ID.REQUEST,
            started: new Date(),
            specific_data: JSON.stringify({})
        }
        // Construct a proper Request meeting object
        let meeting = {
            category: PACOV_ID.MEETING,
            data: {something: formdata},
            specific_data: JSON.stringify({
                suggested_meetingdate: formdata.suggested_meetingdate,
                meeting_type: formdata.meeting_type
            })
        }
        console.log("Submitting", invite, meeting, formdata)
        let invite_response = await dataService.postDataAuth("api/user/pacov/register", invite)
        let meeting_response = await dataService.postDataAuth("api/user/pacov/register", meeting)
        let inviter_relation = {type: RELATION_ID.INVITER, pacovA: props.user_pacov.uuid, pacovB: invite_response.uuid}
        let response = await dataService.postDataAuth("api/user/relation/register", inviter_relation)
        console.log(response)
    }

    const handleClickOnAnyList = (e) => {
        const {value, id, className} = e.target
        console.log("position of clicked:", className, value, id)
        let operator = ""
        let list = ""
        switch (className) {
            case "unselected-participants":
                operator = "add"
                list = "participants"
                break;
            case "selected-participants":
                    operator = "remove"
                    list = "participants"
                    break;
            case "unselected-topics":
                    operator = "add"
                    list = "topics"
                    break;
            case "selected-topics":
                    operator = "remove"
                    list = "topics"
                    break; 
            default:
                // no option
        }
        moveItem(value, operator, list) 
    }

    const handleClickOnMakeDocument = (e) => {
        e.preventDefault();
        setDisplay_modal(true)
    }

    // Function for handling changes in form
    const updateValue = (e) => { 
        e.persist();
        const value = e.target.value
        setFormdata(prevState => ({...prevState, [e.target.name]: value})) 
    }
    
    return (
        <div>
            <MeetingRequestForm
            updateValue={updateValue}
            formdata={formdata}
            scheme={scheme}
            />
            <MeetingPersonsList
                unselected={persons.unselected}
                selected={persons.selected}
                handleClickOnAnyList={handleClickOnAnyList}
            />
            <MeetingTopicsList
                unselected={topics.unselected}
                selected={topics.selected}
                handleClickOnAnyList={handleClickOnAnyList}
            />
            <Button onClick={handleClickOnMakeDocument}>Make Document</Button>
            <MeetingrequestModal
                handleSubmit={handleSubmit}
                topics={topics.selected}
                participants={persons.selected}
                formdata={formdata}
                display_modal={display_modal}
                setDisplay_modal={setDisplay_modal}
                />
        </div>
    )
}

export default NewMeetingRequest