import {filterService} from './filter-service'
import {constructionService} from './construction-service'
import {PACOV_ID, RELATION_ID} from '../Hardcoded/lookup-table'
import MeetingObject from '../_models/meetingobj'

const makeParticipantsList = (meeting_relations, request_relations) => {
    let meeting_participants_relations = filterService.filterRelationsByType(meeting_relations, RELATION_ID.PARTICIPANT)
    let request_receivers_relations = filterService.filterRelationsByType(request_relations, RELATION_ID.INVITEE)
    let request_expresser_relations = filterService.filterRelationsByType(request_relations, RELATION_ID.INVITER)
    let participants = {}
    let relationarray = [meeting_participants_relations, request_receivers_relations, request_expresser_relations]
    relationarray.forEach(listobj => {
        for (let key in listobj) {
            let relation = meeting_participants_relations[key]
            let pacov = relation.pacovB
            let obj = {}
            if (relation.type === RELATION_ID.PARTICIPANT) {
                obj.attender = relation.start
                obj.attended = relation.end    
            }
            if (relation.type === RELATION_ID.INVITEE) {
                obj.responder = relation.start
                obj.responded = relation.end    
            }
            if (relation.type === RELATION_ID.INVITER) {
                obj.requester = relation.start
                obj.requested = relation.end    
            }
            // Final saving of object
            if (participants.hasOwnProperty(pacov.uuid)) {
                participants[pacov.uuid] = Object.assign(participants[pacov.uuid], obj)
            }
            else {
                obj.person_pacov = pacov
                participants[pacov.uuid] = obj
            }
        } 
    })
    return Object.values(participants)
}

const makeTopicsList = (meeting_relations, request_relations) => {
    let meeting_topics_relations = filterService.filterRelationsByType(meeting_relations, RELATION_ID.MEETING_TOPIC)
    let request_topics_relations = filterService.filterRelationsByType(request_relations, RELATION_ID.REQUEST_TOPIC)
    let topics = {}
    let relationarray = [meeting_topics_relations, request_topics_relations]
    relationarray.forEach(listobj => {
        for (let key in listobj) {
            let relation = meeting_topics_relations[key]
            let pacov = relation.pacovB
            let obj = {}
            if (relation.type === RELATION_ID.MEETING_TOPIC) {
                obj.request_headline = relation.headline
                obj.request_description = relation.description
                obj.request_listposition = relation.idcode   
            }
            if (relation.type === RELATION_ID.REQUEST_TOPIC) {
                obj.ongoing_headline = relation.headline
                obj.ongoing_description = relation.description
                obj.ongoing_listposition = relation.idcode   
            }
            // Final saving of object
            if (topics.hasOwnProperty(pacov.uuid)) {
                topics[pacov.uuid] = Object.assign(topics[pacov.uuid], obj)
            }
            else {
                obj.person_pacov = pacov
                topics[pacov.uuid] = obj
            }
        } 
    })
    return Object.values(topics)
}

const makeMeetingEnhancedObjList = (pacovs, relations) => {
    const meetings = filterService.filterPacovsByCategory(pacovs, PACOV_ID.MEETING)
    for (let key in meetings) {
        let meeting = meetings[key]
        let meeting_relations = filterService.findRelationsToPacov(relations, meeting)
        let request = (function() {
            let relation = Object.values(filterService.filterRelationsByType(meeting_relations, RELATION_ID.EVENT_IN_QUESTION))[0]
            let request = filterService.findPacovByUUID(pacovs, relation.pacovB)
            return request
        })
        let executive_entity = (function() {
            let relation = Object.values(filterService.filterRelationsByType(meeting_relations, RELATION_ID.EXECUTIVE_ENTITY))[0]
            let entity = filterService.findPacovByUUID(pacovs, relation.pacovB)
            return entity
        })
        let request_relations = filterService.findRelationsToPacov(relations, request)
        let meeting_relations_expanded = constructionService.expandPacovsInRelations(pacovs, meeting_relations)
        let request_relations_expanded = constructionService.expandPacovsInRelations(pacovs, request_relations)
        let meetingobj = new MeetingObject()
        meetingobj = Object.assign(meetingobj, meeting)
        meetingobj.request = request
        meetingobj.executive_entity = executive_entity
        meetingobj.participants = makeParticipantsList(meeting_relations_expanded, request_relations_expanded)
        meetingobj.topics = makeTopicsList(meeting_relations_expanded, request_relations_expanded)
    }
}

// Construct a list of front end specific UserRelation objects
const produceUserRoles = (relations, user_pacov, pacovs) => {    
    console.log("running produceUserRoles with this data:", relations, user_pacov, pacovs)
    // Filter for relations of type Role
    let filtered_relations = filterService.filterRelationsByType(relations, RELATION_ID.ROLE)    
    // Filter for relations containing user and allign
    filtered_relations = filterService.findRelationsToPacov(filtered_relations, user_pacov)
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
const produceUserMeetings = (relations, pacovs) => {    
    console.log("running produceUserMeetings with this data:", relations, pacovs)
    // Filter for pacovs of type Meeting
    let meetings = filterService.filterPacovsByCategory(pacovs, PACOV_ID.MEETING)    
    for (let key in meetings) {
        // Start with the base PACOV, we will add specific new fields to this
        let meeting = meetings[key]
        // Find different Relations to Meeting PACOV        
        let meetingrelations = filterService.findRelationsToPacov(relations, meeting)
        console.log("meetingrelations", meetingrelations)
        // Isolate Relations
        let query_obj = {
            request_relation: Object.values(filterService.filterRelationsByType(meetingrelations, RELATION_ID.EVENT_IN_QUESTION))[0],
            collectiveentity_relation: Object.values(filterService.filterRelationsByType(meetingrelations,RELATION_ID.EXECUTIVE_ENTITY))[0],
            meeting_topic_relations: filterService.filterRelationsByType(meetingrelations, RELATION_ID.MEETING_TOPIC),
            attendee_relations: filterService.filterRelationsByType(meetingrelations, RELATION_ID.PARTICIPANT),
    //      logger_relations: filterService.filterRelationsByType(meetingrelations, RELATION_ID.PARTICIPANT),
    //      runner_relations: filterService.filterRelationsByType(meetingrelations, RELATION_ID.PARTICIPANT),   
        }
        if (query_obj.request_relation) {
            query_obj.request = filterService.findPacovByUUID(pacovs, query_obj.request_relation.pacovB) 
        }
        if (query_obj.collectiveentity_relation) {
            query_obj.collectiveentity = filterService.findPacovByUUID(pacovs, query_obj.collectiveentity_relation.pacovB)
        }
        // Find different Relations to Request PACOV
        console.log("request-relation", query_obj.request_relation)       
        query_obj.request_relations = filterService.findRelationsToPacov(relations, query_obj.request)
        query_obj.invited_relations = filterService.filterRelationsByType(query_obj.request_relations, RELATION_ID.INVITEE)
        query_obj.inviter_relation = Object.values(filterService.filterRelationsByType(query_obj.request_relations, RELATION_ID.INVITER))[0]
        query_obj.request_topic_relations = filterService.filterRelationsByType(query_obj.request_relations, RELATION_ID.REQUEST_TOPIC)
        // Construct Object
        // Add Participants
        meeting.participants = []
        // Add Inviter
        if (query_obj.inviter_relation) {
            query_obj.inviter = filterService.findPacovByUUID(pacovs, query_obj.inviter_relation.pacovB)
            let participant = {
                person_pacov: query_obj.inviter,
                inviter: query_obj.inviter_relation.started
            }
            meeting.participants.push(participant)
        }
        // Add Inviteds
        for (let key in query_obj.invited_relations) {
            let invited_relation = query_obj.invited_relations[key]
            let invited = filterService.findPacovByUUID(pacovs, invited_relation.pacovB)
            let participant = {
                person_pacov: invited, 
                invitee: invited_relation.started,
                responder: invited_relation.ended
            }
            meeting.participants.push(participant)
        }
        // Adding Attendees
        for (let key in query_obj.attendee_relations) {
            let attendee_relation = query_obj.attendee_relations[key]
            let attendee = filterService.findPacovByUUID(pacovs, attendee_relation.pacovB)
            // Check if and and routine for participant already in list
            let existing_participant_index = meeting.participants.findIndex(participant => participant.person_pacov.uuid = attendee.uuid )
            let existing_participant = {}
            if (existing_participant_index !== -1) {
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
        for (let key in query_obj.request_topic_relations) {
            let topic_relation = query_obj.request_topic_relations[key]
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
        for (let key in query_obj.meeting_topic_relations) {
            let topic_relation = query_obj.meeting_topic_relations[key]
            let topic_pacov = filterService.findPacovByUUID(pacovs, topic_relation.pacovB)
            // Check if and and routine for topic already in list
            let existing_topic_index = meeting.topics.findIndex(topic => topic.topic_pacov.uuid = topic_pacov.uuid )
            let existing_topic = {}
            if (existing_topic_index !== -1) {
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
        meeting.executive_entity = query_obj.collectiveentity
        // Storing meeting
        meetings[key] = meeting
    }
    return meetings
}

export const productionService = {
    produceUserRoles,
    produceUserMeetings,
    makeMeetingEnhancedObjList
}