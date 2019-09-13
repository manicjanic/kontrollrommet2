import { filterService } from "../_services/filter-service";
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
            let relation = listobj[key]
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
            let relation = listobj[key]
            let pacov = relation.pacovB
            let obj = {}
            if (relation.type === RELATION_ID.MEETING_TOPIC) {
                obj.request_headline = relation.specific_data.headline || relation.name
                obj.request_description = relation.specific_data.description || ""
                obj.request_listposition = relation.idcode   
            }
            if (relation.type === RELATION_ID.REQUEST_TOPIC) {
                obj.ongoing_headline = relation.headline || relation.name
                obj.ongoing_description = relation.description || ""
                obj.ongoing_listposition = relation.idcode   
            }
            // Final saving of object
            if (topics.hasOwnProperty(pacov.uuid)) {
                topics[pacov.uuid] = Object.assign(topics[pacov.uuid], obj)
            }
            else {
                obj.topic_pacov = pacov
                topics[pacov.uuid] = obj
            }
        } 
    })
    return Object.values(topics)
}

// Construct enhanced meeting objects, with data about request and other stuff
const makeEnhancedMeetingObjList = (pacovs, relations) => {
    const meetings = filterService.filterPacovsByCategory(pacovs, PACOV_ID.MEETING)
    const meetings_enhanced = constructionService.enhancePacovs(meetings, pacovs, relations)
    let objlist = {}
    for (let key in meetings_enhanced) {
        let meeting = meetings_enhanced[key]
        const getRequest = () => {
            let relation = Object.values(filterService.filterRelationsByType(meeting.relations, RELATION_ID.EVENT_IN_QUESTION))[0]
            if (relation) {
                let request = relation.pacovB
                let requestobjlist = constructionService.enhancePacovs({[request.uuid]: request}, pacovs, relations)
                return Object.values(requestobjlist)[0]
            }
            return undefined
        }
        const getEntity = () => {
            let relation = Object.values(filterService.filterRelationsByType(meeting.relations, RELATION_ID.EXECUTIVE_ENTITY))[0]
            let entity = relation? relation.pacovB : null
            return entity
        }
        let executive_entity = getEntity()
        let request = getRequest()? getRequest() : {}
        let meetingobj = new MeetingObject()
        meetingobj = Object.assign(meetingobj, meeting)
        meetingobj.request = request
        meetingobj.executive_entity = executive_entity
        meetingobj.participants = makeParticipantsList(meeting.relations, request.relations)
        meetingobj.topics = makeTopicsList(meeting.relations, request.relations)
        // Store object in list
        objlist[key] = meetingobj
    }
    return objlist
}

// Construct ListObj from array of objects, making a designated key as idkey
const constructListObj = (data_list, idkey) => {
    console.log("running constructListObj with this data:", data_list, idkey)
    let listobj = {}
   data_list.forEach((item) => {
        listobj[item[idkey]] = item
    })
    return listobj    
}

// Flatten nested property in object
const flattenData = (listobj, nestkey) => {
    console.log("running flattenData with this data:", listobj, nestkey)
    let resultobj = listobj
    for (let key in resultobj) {
        let obj = resultobj[key]
        for (let deepkey in obj[nestkey]) {
            obj[deepkey] = obj[nestkey][deepkey]  
        }
        delete obj[nestkey]
        resultobj[key] = obj
    }
    return resultobj
}

// Add an extra prop called relations to Pacov, containing all relations in expanded form.
const enhancePacovs = (unenhanceds, pacovs, relations) => {
    console.log("running enhancePacovs with this data:", unenhanceds, pacovs, relations)
    let resultobj = {}
    for (let key in unenhanceds) {
        let obj = unenhanceds[key]
        let obj_relations = filterService.findRelationsToPacov(relations, obj)
        let obj_relations_expanded = expandPacovsInRelations(pacovs, obj_relations)
        obj.relations = obj_relations_expanded
        resultobj[key] = obj
    }
    return resultobj
}

// Expand PacovA and B in a Relation to be full objects
const expandPacovsInRelations = (pacovs, relations) => {
    console.log("running expandPacovsInRelation with this data:", pacovs, JSON.parse(JSON.stringify(relations)))
    let resultobj = {}
    for (let key in relations) {
        let relation = relations[key]
        if (typeof relation.pacovA === "string" && typeof relation.pacovB === "string") {
            relation.pacovA = filterService.findPacovByUUID(pacovs, relation.pacovA)
            relation.pacovB = filterService.findPacovByUUID(pacovs, relation.pacovB)    
        }
        resultobj[key] = relation
    }
    return resultobj
}

export const constructionService = {
    constructListObj,
    flattenData,
    enhancePacovs,
    expandPacovsInRelations,
    makeEnhancedMeetingObjList
}