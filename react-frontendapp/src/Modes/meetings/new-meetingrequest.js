import React, { useState, useEffect } from 'react';

import {filterService} from '../../_services/filter-service'
import {PACOV_ID} from '../../_helpers/lookup-table'

import MeetingRequestForm from '../../Components/meetingrequest-form'
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

    const handleSubmit = (e) => {
        e.preventDefault();

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
            handleSubmit={handleSubmit}
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
        </div>
    )
}

export default NewMeetingRequest