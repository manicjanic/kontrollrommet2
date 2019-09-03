import React, { useState, useEffect } from 'react';

import {filterService} from '../../_services/filter-service'
import {PACOV_ID} from '../../_helpers/lookup-table'

import MeetingRequestForm from '../../Components/meetingrequest-form'
import ParticipantsList from '../../Components/participants-list'

// Layout
const NewMeetingRequest = (props) => {
    console.log("Running new meeting request layout")

    // Set local state
    const [formdata, setFormdata] = useState({})
    const [selected, setSelected] = useState({
        participants: []
    })
    const [choices, setChoices] = useState({
        meetingtypes: generateOptions(), 
        participants: generateParticipants()
    })
        
    function generateOptions() {
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

    const moveItem = (value, operator) => { 
        let current_choices = choices
        let current_selected = selected
        if (operator === "add") {
            let selected_item = current_choices.participants.splice(value, 1)
            current_selected.participants.push(selected_item[0])
            console.log("before altering lists:", current_choices, current_selected)
        }
        if (operator === "remove") {
            let selected_item = current_selected.participants.splice(value, 1)
            current_choices.participants.push(selected_item[0])
            console.log("before altering lists:", current_choices, current_selected)
        }
        setChoices(prevState => ({...prevState, participants: current_choices.participants})) 
        setSelected(prevState => ({...prevState, participants: current_selected.participants}))    
}

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const handleClickParticipants = (e) => {
        let position = e.target.value
        console.log("position of clicked:", position)
        moveItem(position, "add") 
    }

    const handleClickSelecteds = (e) => {
        let position = e.target.value
        console.log("position of clicked:", position)
        moveItem(position, "remove") 
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
            meetingtypes={choices.meetingtypes}
            />
            <ParticipantsList
                participants={choices.participants}
                selecteds={selected.participants}
                handleClickSelecteds={handleClickSelecteds}
                handleClickParticipants={handleClickParticipants}
            />
        </div>
    )
}

export default NewMeetingRequest