import {filterService} from '../_services/filter-service'

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

// Construct UserRelations List
const constructUserRepresentationsList = (relations, userpacov, pacovs) => {    
    // Find relations of type Role(17)
    let filtered_relations = filterService.findRelationsByType(relations, 17)    
    filtered_relations = filterService.findRelationsToPacov(filtered_relations, userpacov)
    filtered_relations = filterService.allignRelationsByPacov(filtered_relations, userpacov)
    filtered_relations  = filterService.expandPacovsInRelations(pacovs, filtered_relations)
    // Construct Userrepresentations List
    let resultlist = []
    for (let relation in filtered_relations) {
        // Construct Object
        let userrepresentaionobj = {}
        userrepresentaionobj.userrole = filtered_relations[relation].function_name
        userrepresentaionobj.organization = filtered_relations[relation].pacovB.name
        userrepresentaionobj.value = relation
        // Add to List
        resultlist.push(userrepresentaionobj)
    }
    return resultlist
}

// Construct Meetingobjects List
const constructMeetingObjList = (pacovs, relations) => {
    // Find Pacovs of type Meeting(34)
    const meetingpacovs_listobj = filterService.findPacovsByType(pacovs, 34)
    // Construct Meetingobjects List
    let resultlist = []
    for (let meetingpacov_key in meetingpacovs_listobj) {
        // Find data
        let meetingpacov = meetingpacovs_listobj[meetingpacov_key]        
        let meetingrelations = filterService.findRelationsToPacov(relations, meetingpacov)
        // (Align)
        meetingrelations = filterService.allignRelationsByPacov(meetingrelations, meetingpacov)
        let request_relation = Object.values(filterService.findRelationsByType(meetingrelations,19))[0]
        let organization_relation = Object.values(filterService.findRelationsByType(meetingrelations,20))[0]
        let request_pacov = filterService.findPacovByUUID(pacovs, request_relation.pacovB)
        let requestpacov_relations = filterService.findRelationsToPacov(relations, request_pacov)
        // (Align)
        requestpacov_relations = filterService.allignRelationsByPacov(requestpacov_relations, request_pacov)                                
        let invitee_relations = filterService.findRelationsByType(requestpacov_relations, 18)
        // Construct Object
        let meetingobj = {}
        meetingobj.uuid = meetingpacov.uuid
        meetingobj.suggested_date = request_pacov.suggested_date
        meetingobj.type = meetingpacov.meeting_type
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
        for (let invitee_relation in invitee_relations) {
            let participant = {
                person_pacov: filterService.findPacovByUUID(pacovs, invitee_relations[invitee_relation].pacovB), 
                invite_accepted: false
            }
            meetingobj.participants.push(participant)
        }
        // Add to List
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