import React, { useState } from 'react';
import {Button} from 'react-bootstrap'

import {filterService} from '../../_services/filter-service'
import {PACOV_ID, RELATION_ID} from '../../Hardcoded/lookup-table'
import {dataService} from '../../_services/data-service'

import MeetingRequestForm from '../../Components/meetingrequest-form'
import MeetingrequestModal from '../../Components/meetingrequest-modal'
import ParticipantsList from '../../Components/participants-list'
import TopicsList from '../../Components/topics-list'

// Layout
const NewMeetingRequest = (props) => {
    // Set local state
    const [formdata, setFormdata] = useState({})
    const [schemedata, setSchemedata] = useState({
        meetingtypes: makeOptionsList()
    })    
    const [participants, setParticipants] = useState({
        selected: [],
        unselected: generateParticipants()
    })
    const [topics, setTopics] = useState({
        selected: [],
        unselected: generateTopics()
    })
    const [showmodal, setShowmodal] = useState(false);
        
    function makeOptionsList() {
        let meeting_category = filterService.findPacovCategory(props.category, PACOV_ID.MEETING)
        let options = meeting_category.defaultscheme.meeting_type_choices
        let resultlist = options.map(element => {
            return {text: element.meeting_type_name, value: element.value}
        })
        console.log("restultlist from generate options", resultlist)
        return resultlist
    }

    function generateParticipants() {
        let {persons} = props
        let resultlist = []
        for (let key in persons) {
            let person = persons[key]
            let participant = {text: person.name, value: person.uuid}
            resultlist.push(participant)   
        }
        console.log("restultlist from generate participants", resultlist)
        return resultlist
    }

    function generateTopics() {
        let {topics} = props
        let resultlist = []
        for (let key in topics) {
            let topic = topics[key]
            let meetingtopic = {text: topic.headline, value: topic.uuid}
            resultlist.push(meetingtopic)   
        }
        console.log("restultlist from generate participants", resultlist)
        return resultlist
    }

    const moveItem = (value, action, name) => {
        let list = {}
        if (name === "participants") {list = participants}
        if (name === "topics") {list = topics}
        if (action === "add") {
            let selected_item = list.unselected.splice(value, 1)
            list.selected.push(selected_item[0])
        }
        if (action === "remove") {
            let selected_item = list.selected.splice(value, 1)
            list.unselected.push(selected_item[0])
        }
        if (name === "participants") {setParticipants({selected: list.selected, unselected: list.unselected})} 
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

    const handleClickOnUnselectedParticipants = (e) => {
        let position = e.target.value
        console.log("position of clicked:", position)
        moveItem(position, "add", "participants") 
    }

    const handleClickOnSelectedParticipants = (e) => {
        let position = e.target.value
        console.log("position of clicked:", position)
        moveItem(position, "remove", "participants") 
    }

    const handleClickOnUnselectedTopics = (e) => {
        let position = e.target.value
        console.log("position of clicked:", position)
        moveItem(position, "add", "topics") 
    }

    const handleClickOnSelectedTopics = (e) => {
        let position = e.target.value
        console.log("position of clicked:", position)
        moveItem(position, "remove", "topics") 
    }

    const handleClickOnMakeDocument = (e) => {
        e.preventDefault();
        setShowmodal(true)
    }

    const setModal = (status) => {
        setShowmodal(status)
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
            meetingtypes={schemedata.meetingtypes}
            />
            <ParticipantsList
                unselected={participants.unselected}
                selected={participants.selected}
                handleClickOnSelected={handleClickOnSelectedParticipants}
                handleClickOnUnselected={handleClickOnUnselectedParticipants}
            />
            <TopicsList
                unselected={topics.unselected}
                selected={topics.selected}
                handleClickOnSelected={handleClickOnSelectedTopics}
                handleClickOnUnselected={handleClickOnUnselectedTopics}
            />
            <Button onClick={handleClickOnMakeDocument}>Make Document</Button>
            <MeetingrequestModal
                handleSubmit={handleSubmit}
                topics={topics.selected}
                participants={participants.selected}
                formdata={formdata}
                showmodal={showmodal}
                setModal={setModal}
                />
        </div>
    )
}

export default NewMeetingRequest