// React Modules
import React, { useState } from 'react';
// React Bootstrap elements
import {Button} from 'react-bootstrap'
// Services and constants
import {filterService} from '../../_services/filter-service'
import {dataService} from '../../_services/data-service'
import {PACOV_ID, RELATION_ID} from '../../Hardcoded/lookup-table'
// App specific components
import MeetingRequestForm from '../../Components/meetingrequest-form'
import MeetingrequestModal from '../../Components/meetingrequest-modal'
import MeetingPersonsList from '../../Components/participants-list'
import MeetingTopicsList from '../../Components/topics-list'

// New Meeting Request Mode Component
const NewMeetingRequestMode = (props) => {
    // Set local state
    const [formdata, setFormdata] = useState({})
    const [scheme, setScheme] = useState(filterService.findPacovCategory(props.category, PACOV_ID.MEETING).defaultscheme)    
    const [persons, setPersons] = useState({
        selected: [],
        unselected: makePacovsDisplayList(props.persons, "name", "uuid")
    })
    const [topics, setTopics] = useState({
        selected: [],
        unselected: makePacovsDisplayList(props.topics, "name", "uuid", "idcode")
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
        // Construct a proper Request object
        let request = {
            category: PACOV_ID.REQUEST,
            started: new Date(),
            specific_data: JSON.stringify({})
        }
        // Construct a proper Meeting object
        let meeting = {
            category: PACOV_ID.MEETING,
            specific_data: JSON.stringify({
                suggested_meetingdate: formdata.suggested_meetingdate,
                meeting_type: formdata.meeting_type
            })
        }
        // Post objects
        console.log("Submitting", request, meeting)
        let request_response = await dataService.postDataAuth("api/user/pacov/register", request)
        let meeting_response = await dataService.postDataAuth("api/user/pacov/register", meeting)
        // Construct Relations
        let sendlist = []
        let request_event_relation = {
            type: RELATION_ID.EVENT_IN_QUESTION,
            pacovA: meeting_response.uuid, 
            pacovB: request_response.uuid
        }
        sendlist.push(request_event_relation)
        let inviter_relation = {
            type: RELATION_ID.INVITER, 
            pacovA: props.user_pacov.uuid, 
            pacovB: request_response.uuid
        }
        sendlist.push(inviter_relation)
        persons.selected.forEach(person => {
            let request_relation = {
                type: RELATION_ID.INVITEE,
                pacovA: request_response.uuid,
                pacovB: person.id
            }
            let event_relation = {
                type: RELATION_ID.PARTICIPANT,
                pacovA: meeting_response.uuid,
                pacovB: person.id
            }
            sendlist.push(request_relation)
            sendlist.push(event_relation)
        })
        topics.selected.forEach(topic => {
            let request_relation = {
                type: RELATION_ID.REQUEST_TOPIC,
                pacovA: request_response.uuid,
                pacovB: topic.id
            }
            let event_relation = {
                type: RELATION_ID.MEETING_TOPIC,
                pacovA: meeting_response.uuid,
                pacovB: topic.id
            }
            sendlist.push(request_relation)
            sendlist.push(event_relation)
        })

        console.log("sendlist", sendlist)
        let response = await dataService.postDataAuth("api/user/relation/register", sendlist)
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
    
    const renderMeetingRequestModal = () => {
        return (
            <MeetingrequestModal
                handleSubmit={handleSubmit}
                topics={topics.selected}
                participants={persons.selected}
                formdata={formdata}
                display_modal={display_modal}
                setDisplay_modal={setDisplay_modal}
                scheme={scheme}
                selected_user_role={props.selected_user_role}
            />
        )
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
            
            {display_modal? renderMeetingRequestModal() : ""}
        </div>
    )
}

export default NewMeetingRequestMode