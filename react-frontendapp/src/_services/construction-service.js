import { filterService } from "../_services/filter-service";
import {PACOV_ID, RELATION_ID} from '../Hardcoded/lookup-table'
import MeetingObject from '../_models/meetingobj'
import ParticipantObject from "../_models/participantobj";
import TopicObject from "../_models/topicobj";

const makeParticipantsList = (relations) => {
    console.log("running makeParticipantsList with this data:", relations)    
    let participants = {}
    for (let key in relations) {
        let relation = relations[key]
        if (relation.pacovB.category === PACOV_ID.PERSON) {
            let participant = new ParticipantObject()
            let person_pacov = relation.pacovB
            if (relation.type === RELATION_ID.PARTICIPANT) {
                participant.attender = relation.start
                participant.attended = relation.end    
            }
            if (relation.type === RELATION_ID.INVITEE) {
                participant.responder = relation.start
                participant.responded = relation.end    
            }
            if (relation.type === RELATION_ID.INVITER) {
                participant.requester = relation.start
                participant.requested = relation.end    
            }
            // Final saving of object
            if (participants.hasOwnProperty(person_pacov.uuid)) {
                participants[person_pacov.uuid] = Object.assign(participants[person_pacov.uuid], participant)
            }
            else {
                participant.person_pacov = person_pacov
                participants[person_pacov.uuid] = participant
            }
        }

    }
    return Object.values(participants)
}

const makeTopicsList = (relations) => {
    console.log("running makeTopicsList with this data:", relations)    
    let topics = {}
    for (let key in relations) {
        let relation = relations[key]
        if (relation.pacovB.category === PACOV_ID.TOPIC) {
            let topic = new TopicObject()
            let topic_pacov = relation.pacovB
            if (relation.type === RELATION_ID.REQUEST_TOPIC) {
                topic.request_headline = relation.specific_data.headline || relation.name
                topic.request_description = relation.specific_data.description || ""
                topic.request_listposition = relation.idcode   
            }
            if (relation.type === RELATION_ID.MEETING_TOPIC) {
                topic.ongoing_headline = relation.headline || relation.name
                topic.ongoing_description = relation.description || ""
                topic.ongoing_listposition = relation.idcode   
            }
            // Final saving of object
            if (topics.hasOwnProperty(topic_pacov.uuid)) {
                topics[topic_pacov.uuid] = Object.assign(topics[topic_pacov.uuid], topic)
            }
            else {
                topic.topic_pacov = topic_pacov
                topics[topic_pacov.uuid] = topic
            }
        }

    }
    return Object.values(topics)
}
//const makeParticipantsList = (meeting_relations, request_relations) => {
//    let meeting_participants_relations = filterService.filterRelationsByType(meeting_relations, RELATION_ID.PARTICIPANT)
//    let request_receivers_relations = filterService.filterRelationsByType(request_relations, RELATION_ID.INVITEE)
//    let request_expresser_relations = filterService.filterRelationsByType(request_relations, RELATION_ID.INVITER)
//    let participants = {}
//    let relationarray = [meeting_participants_relations, request_receivers_relations, request_expresser_relations]
//    relationarray.forEach(listobj => {
//        for (let key in listobj) {
//            let relation = listobj[key]
//            let pacov = relation.pacovB
//            let obj = {}
//            if (relation.type === RELATION_ID.PARTICIPANT) {
//                obj.attender = relation.start
//                obj.attended = relation.end    
//            }
//            if (relation.type === RELATION_ID.INVITEE) {
//                obj.responder = relation.start
//                obj.responded = relation.end    
//            }
//            if (relation.type === RELATION_ID.INVITER) {
//                obj.requester = relation.start
//                obj.requested = relation.end    
//            }
//            // Final saving of object
//            if (participants.hasOwnProperty(pacov.uuid)) {
//                participants[pacov.uuid] = Object.assign(participants[pacov.uuid], obj)
//            }
//            else {
//                obj.person_pacov = pacov
//                participants[pacov.uuid] = obj
//            }
//        } 
//    })
//    return Object.values(participants)
//}

//const makeTopicsList = (meeting_relations, request_relations) => {
//    let meeting_topics_relations = filterService.filterRelationsByType(meeting_relations, RELATION_ID.MEETING_TOPIC)
//    let request_topics_relations = filterService.filterRelationsByType(request_relations, RELATION_ID.REQUEST_TOPIC)
//    let topics = {}
//    let relationarray = [meeting_topics_relations, request_topics_relations]
//    relationarray.forEach(listobj => {
//        for (let key in listobj) {
//            let relation = listobj[key]
//            let pacov = relation.pacovB
//            let obj = {}
//            if (relation.type === RELATION_ID.MEETING_TOPIC) {
//                obj.request_headline = relation.specific_data.headline || relation.name
//                obj.request_description = relation.specific_data.description || ""
//                obj.request_listposition = relation.idcode   
//            }
//            if (relation.type === RELATION_ID.REQUEST_TOPIC) {
//                obj.ongoing_headline = relation.headline || relation.name
//                obj.ongoing_description = relation.description || ""
//                obj.ongoing_listposition = relation.idcode   
//            }
//            // Final saving of object
//            if (topics.hasOwnProperty(pacov.uuid)) {
//                topics[pacov.uuid] = Object.assign(topics[pacov.uuid], obj)
//            }
//            else {
//                obj.topic_pacov = pacov
//                topics[pacov.uuid] = obj
//            }
//        } 
//    })
//    return Object.values(topics)
//}

// Construct enhanced meeting objects, with data about request and other stuff
const enhanceMeetings = (meetings, pacovs, relations) => {
    const meetings_enhanced = constructionService.enhancePacovs(meetings, pacovs, relations)
    let objlist = {}
    const makeEnhancedRequest = (meeting_enhanced) => {
        let request_relation = filterService.filterRelationsByType(meeting_enhanced.relations, RELATION_ID.EVENT_IN_QUESTION, true)
        if (request_relation) {
            let request = request_relation.pacovB
            let request_enhanced = constructionService.enhancePacovs({[request.uuid]: request}, pacovs, relations)
            return request_enhanced 
        }
        return undefined
    }
for (let key in meetings_enhanced) {
        let meeting_enhanced = meetings_enhanced[key]
        let request_enhanced = makeEnhancedRequest(meeting_enhanced)
        let meetingobj = new MeetingObject()
        meetingobj = Object.assign(meetingobj, meeting_enhanced)
        meetingobj.participants = makeParticipantsList(meeting_enhanced.relations, request_enhanced.relations)
        meetingobj.topics = makeTopicsList(meeting_enhanced.relations, request_enhanced.relations)
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

// Add an extra prop called relations to Pacov, containing all its known relations, in expanded form.
const enhancePacovs = (unenhanceds, pacovs, relations, single=false) => {
    console.log("running enhancePacovs with this data:", unenhanceds, pacovs, relations)
    let resultobj = {}
    for (let key in unenhanceds) {
        let obj = unenhanceds[key]
        let obj_relations = filterService.findRelationsToPacov(relations, obj)
        let obj_relations_expanded = expandPacovsInRelations(pacovs, obj_relations)
        obj.relations = obj_relations_expanded
        resultobj[key] = obj
    }
    if (single) {resultobj = Object.values(resultobj)[0]}
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
    enhanceMeetings,
    makeParticipantsList,
    makeTopicsList,
}