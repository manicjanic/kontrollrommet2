import {filterService} from './filter-service'
import {PACOV_ID, RELATION_ID} from '../_helpers/lookup-table'

// Construct a list of front end specific UserRelation objects
const produceUserRoles = (relations, userpacov, pacovs) => {    
    console.log("running produceUserRoles with this data:", relations, userpacov, pacovs)
    // Filter for relations of type Role
    let filtered_relations = filterService.filterRelationsByType(relations, RELATION_ID.ROLE)    
    // Filter for relations containing user and allign
    filtered_relations = filterService.findRelationsToPacov(filtered_relations, userpacov)
    // Construct Userrepresentations List
    console.log("filtered relations", filtered_relations)
    let resultobj = filtered_relations
    for (let key in resultobj) {
        // Construct Object
        resultobj[key].collective_entity = filterService.findPacovByUUID(pacovs, resultobj[key].pacovB)
    }
    return resultobj
}

// Construct a list of front end specific UserRelation objects
const produceUserMeetings = (relations, userpacov, pacovs) => {    
    console.log("running produceUserMeetings with this data:", relations, userpacov, pacovs)
    // Filter for pacovs of type Meeting
    let meetings = filterService.filterPacovsByCategory(pacovs, PACOV_ID.MEETING)    
    for (let key in meetings) {
        let meeting = meetings[key]
        // Find different Relations to Meeting PACOV        
        let meetingrelations = filterService.findRelationsToPacov(relations, meeting)
        console.log("meetingrelations", meetingrelations)
        // Isolage Request
        let request_relation = Object.values(filterService.filterRelationsByType(meetingrelations, RELATION_ID.EVENT_IN_QUESTION))[0]
        let request = filterService.findPacovByUUID(pacovs, request_relation.pacovB)
        let collectiveentity_relation = Object.values(filterService.filterRelationsByType(meetingrelations,RELATION_ID.EXECUTIVE_ENTITY))[0]
        let collectiveentity = filterService.findPacovByUUID(pacovs, collectiveentity_relation.pacovB)
        let meeting_topic_relations = filterService.filterRelationsByType(meetingrelations, RELATION_ID.MEETING_TOPIC)
        let attendee_relations = filterService.filterRelationsByType(meetingrelations, RELATION_ID.PARTICIPANT)
//        let logger_relations = filterService.filterRelationsByType(meetingrelations, RELATION_ID.PARTICIPANT)
//        let runner_relations = filterService.filterRelationsByType(meetingrelations, RELATION_ID.PARTICIPANT)
        // Find different Relations to Request PACOV
        console.log("request-relation", request_relation)       
        let request_relations = filterService.findRelationsToPacov(relations, request)
        let invited_relations = filterService.filterRelationsByType(request_relations, RELATION_ID.INVITEE)
        let inviter_relation = Object.values(filterService.filterRelationsByType(request_relations, RELATION_ID.INVITER))[0]
        let request_topic_relations = filterService.filterRelationsByType(request_relations, RELATION_ID.REQUEST_TOPIC)
        // Construct Object
        // Add Participants
        meeting.participants = []
        // Add Inviter
        let inviter = filterService.findPacovByUUID(pacovs, inviter_relation.pacovB)
        let participant = {
            person_pacov: inviter,
            inviter: inviter_relation.started
        }
        meeting.participants.push(participant)
        // Add Inviteds
        for (let key in invited_relations) {
            let invited_relation = invited_relations[key]
            let invited = filterService.findPacovByUUID(pacovs, invited_relation.pacovB)
            let participant = {
                person_pacov: invited, 
                invitee: invited_relation.started,
                responder: invited_relation.ended
            }
            meeting.participants.push(participant)
        }
        // Adding Attendees
        for (let key in attendee_relations) {
            let attendee_relation = attendee_relations[key]
            let attendee = filterService.findPacovByUUID(pacovs, attendee_relation.pacovB)
            // Check if and and routine for participant already in list
            let existing_participant_index = meeting.participants.findIndex(participant => participant.person_pacov.uuid = attendee.uuid )
            let existing_participant = {}
            if (existing_participant_index != -1) {
                existing_participant = meeting.participants[existing_participant_index]
                delete existing_participant.person_pacov
                meeting.participants.splice(existing_participant_index, 1)
            }
            let participant = {
                person_pacov: attendee, 
                attender: attendee_relation.started,
                attended: attendee_relation.ended
            }
            participant = Object.assign(participant, existing_participant)
            meeting.participants.push(participant)
        }
        // Add Topics
        // Add Request Topics
        meeting.topics = []
        for (let key in request_topic_relations) {
            let topic_relation = request_topic_relations[key]
            let topic_pacov = filterService.findPacovByUUID(pacovs, topic_relation.pacovB)
            let topic = {
                topic_pacov: topic_pacov, 
                request_headline: topic_relation.request_topic_headline,
                request_description: topic_relation.request_topic_description,
                request_listposition: topic_relation.idcode
            }
            meeting.topics.push(topic)
        }
        // Add Meeting Topics
        for (let key in meeting_topic_relations) {
            let topic_relation = meeting_topic_relations[key]
            let topic_pacov = filterService.findPacovByUUID(pacovs, topic_relation.pacovB)
            // Check if and and routine for topic already in list
            let existing_topic_index = meeting.topics.findIndex(topic => topic.topic_pacov.uuid = topic_pacov.uuid )
            let existing_topic = {}
            if (existing_topic_index != -1) {
                existing_topic = meeting.topics[existing_topic_index]
                delete existing_topic.topic_pacov
                meeting.topics.splice(existing_topic_index, 1)
            }
            let topic = {
                topic_pacov: topic_pacov, 
                ongoing_headline: topic_relation.event_topic_headline,
                ongoing_description: topic_relation.event_topic_description,
                ongoing_listposition: topic_relation.idcode
            }
            topic = Object.assign(topic, existing_topic)
            meeting.topics.push(topic)
        }
        // Adding executive entity
        meeting.executive_entity = collectiveentity
        // Storing meeting
        meetings[key] = meeting
    }
    return meetings
}

export const productionService = {
    produceUserRoles,
    produceUserMeetings
}