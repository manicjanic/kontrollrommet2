import {filterService} from '../_services/filter-service'
import {ID as SET_ID, KEY} from '../_helpers/lookup-table'

// Construct Catalog List Object
const constructCatalogListObject = (catalogdata_list) => {
    let catalog_listobj = {}
    catalogdata_list.forEach((item) => {
        catalog_listobj[item.id] = item
    })
    return catalog_listobj
}

// Construct Pacov List Object
const constructPacovsListObject = (pacovsdata_list) => {
    let pacovs_listobj = {}
    pacovsdata_list.forEach((item) => {
        // Extract added data and present it flat in object
        for (let prop in item.added_data) {
            item[prop] = item.added_data[prop]
        }
        delete item.added_data
        // Extract specific data and present it flat
        if (item.specific_data !== null) {
            for (let prop in item.specific_data) {
                item[prop] = item.specific_data[prop]
            }
            delete item.specific_data
        }
        pacovs_listobj[item.uuid] = item
    })
    return pacovs_listobj
}

// Construct Relation List Object
const constructRelationsListObject = (relationsdata_list) => {
    let relations_listobj = {}
    relationsdata_list.forEach((item) => {
        // Extract added data and present it flat in object
        for (let prop in item.added_data) {
            item[prop] = item.added_data[prop]
        }
        delete item.added_data
        // Extract specific data and present it flat
        if (item.specific_data !== null) {
            for (let prop in item.specific_data) {
                item[prop] = item.specific_data[prop]
            }
            delete item.specific_data
        }
        relations_listobj[item.uuid] = item
    })
    return relations_listobj
}

// Construct a list of front end specific UserRelation objects
const constructUserRepresentationsList = (relations, userpacov, pacovs) => {    
    // Find relations of type Role(17)
    let filtered_relations = filterService.findRelationsByType(relations, SET_ID.ROLE_ID)    
    filtered_relations = filterService.findRelationsToPacov(filtered_relations, userpacov)
    filtered_relations = filterService.allignRelationsByPacov(filtered_relations, userpacov)
    filtered_relations  = filterService.expandPacovsInRelations(pacovs, filtered_relations)
    // Construct Userrepresentations List
    let resultlist = []
    for (let relation in filtered_relations) {
        // Construct Object
        let userrepresentaionobj = {}
        userrepresentaionobj.userrole = filtered_relations[relation][KEY.ROLE_NAME]
        userrepresentaionobj.organization = filtered_relations[relation].pacovB.name
        userrepresentaionobj.value = relation
        // Add to List
        resultlist.push(userrepresentaionobj)
    }
    return resultlist
}

// Construct a list of fronend specific Meeting objects
const constructMeetingObjList = (pacovs, relations) => {
    console.log("Running construct meeting obj")
    // Find Pacovs of type Meeting(34)
    const meetingpacovs = filterService.findPacovsByCategory(pacovs, SET_ID.MEETING_ID)
    console.log("Meeting Pacovs", meetingpacovs)
    // Construct Meetingobjects List
    let resultlist = []
    for (let meetingpacov_uuid in meetingpacovs) {
        // Find different Relations to Meeting PACOV
        let meetingpacov = meetingpacovs[meetingpacov_uuid]        
        let meetingrelations = filterService.findRelationsToPacov(relations, meetingpacov)
        let request_relation = Object.values(filterService.findRelationsByType(meetingrelations, SET_ID.EVENT_IN_QUESTION_ID))[0]
        let organization_relation = Object.values(filterService.findRelationsByType(meetingrelations,SET_ID.EXECUTIVE_ENTITY_ID))[0]
        let topic_relations = filterService.findRelationsByType(meetingrelations, SET_ID.MEETING_TOPIC_ID)
        let participant_relations = filterService.findRelationsByType(meetingrelations, SET_ID.PARTICIPANT_ID)
        // Find different Relations to Request PACOV        
        let request_pacov = filterService.findPacovByUUID(pacovs, request_relation.pacovB)
        let request_relations = filterService.findRelationsToPacov(relations, request_pacov)
        let invited_relations = filterService.findRelationsByType(request_relations, SET_ID.INVITEE_ID)
        // Construct Object
        let meetingobj = {}
        meetingobj.uuid = meetingpacov.uuid
        meetingobj.suggested_date = request_pacov[KEY.SUGGESTED_MEETINGDATE]
        meetingobj.type = meetingpacov[KEY.MEETING_TYPE]
        meetingobj.organization = filterService.findPacovByUUID(pacovs, organization_relation.pacovB)
        if (!request_pacov.dateA) {
            meetingobj.status = "DRAFT"
        }
        if (request_pacov.dateA) {
            meetingobj.status = "CALLSENT"
        }
        if (meetingpacov.dateA) {
            meetingobj.status = "ONGOING"
        }
        if (meetingpacov.dateB) {
            meetingobj.status = "COMPLETED"
        }
        meetingobj.start = meetingpacov.dateA
        meetingobj.end = meetingpacov.dateB
        meetingobj.participants = []
        for (let participant_relation in participant_relations) {
            let participant = {
                person_pacov: filterService.findPacovByUUID(pacovs, participant_relations[participant_relation].pacovB), 
                invite_accepted: false
            }
            meetingobj.participants.push(participant)
        }
        meetingobj.topics = []
        for (let topic_relation in topic_relations) {
            let topic = {
                topic_pacov: filterService.findPacovByUUID(pacovs, topic_relations[topic_relation].pacovB),
                listposition: parseInt(topic_relations[topic_relation].idcode)
            }
            meetingobj.topics.push(topic)
        }
        // Add to List
        console.log("Meeting Obj", meetingobj)
        resultlist.push(meetingobj)
    }
    return resultlist
}

export const ConstructionService = {
    constructCatalogListObject,
    constructPacovsListObject,
    constructRelationsListObject,
    constructUserRepresentationsList,
    constructMeetingObjList
    }