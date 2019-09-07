import {filterService} from './filter-service'
import {PACOV_ID, KEY} from '../Hardcoded/lookup-table'
import {MeetingObj} from '../_models/meetingobj'


export const dirtyLogic = {
}

// Construct Catalog List Object
const constructCatalogListObj = (catalogdata_list) => {
    let catalog_listobj = {}
    catalogdata_list.forEach((item) => {
        catalog_listobj[item.id] = item
    })
    return catalog_listobj
}


// Construct Pacov List Object
const constructPacovsListObj = (pacovsdata_list) => {
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
const constructRelationsListObj = (relationsdata_list) => {
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


// Construct a list of fronend specific Person objects
const constructParticipantsListObj = (pacovs) => {
    console.log("Running construct person obj")
    // Find Pacovs of type Person
    const personpacovs = filterService.filterPacovsByCategory(pacovs, PACOV_ID.PERSON)
    console.log("Person Pacovs", personpacovs)
    // Construct Personobjects List
    let resultobj = personpacovs
    for (let uuid in resultobj) {
        // Assign extra methods and relational fields to object
        let personobj = Object.assign(resultobj[uuid], new PersonObj())
        console.log("Meeting Obj", personobj)
        // alter resultobj
        resultobj[uuid] = personobj
    }
    return resultobj
}

// Construct a list of fronend specific Topic objects
const constructMeetingTopicsListObj = (pacovs) => {
    console.log("Running construct topic obj")
    // Find Pacovs of type Topic
    const topicpacovs = filterService.filterPacovsByCategory(pacovs, PACOV_ID.PERSON)
    console.log("Topic Pacovs", topicpacovs)
    // Construct Topicobjects List
    let resultobj = topicpacovs
    for (let uuid in resultobj) {
        // Assign extra methods and relational fields to object
        let topicobj = Object.assign(resultobj[uuid], new TopicObj())
        console.log("Meeting Obj", topicobj)
        // alter resultobj
        resultobj[uuid] = topicobj
    }
    return resultobj
}

// Construct a list of fronend specific Meeting objects
const constructMeetingsListObj = (pacovs) => {
    console.log("Running construct meeting obj")
    // Find Pacovs of type Meeting
    const meetingpacovs = filterService.filterPacovsByCategory(pacovs, PACOV_ID.MEETING)
    console.log("Meeting Pacovs", meetingpacovs)
    // Construct Meetingobjects List
    let resultobj = meetingpacovs
    for (let uuid in resultobj) {
        // Assign extra methods and relational fields to object
        let meetingobj = Object.assign(resultobj[uuid], new MeetingObj())
        console.log("Meeting Obj", meetingobj)
        // alter resultobj
        resultobj[uuid] = meetingobj
    }
    return resultobj
}

const expandPacovsInRelations = (pacovs, relations) => {
    console.log("running expandPacovsInRelations with this data:", pacovs, relations)
    const resultobj = relations
    for (let relation in relations) {
        resultobj[relation].pacovA = pacovs[resultobj[relation].pacovA]
        resultobj[relation].pacovB = pacovs[resultobj[relation].pacovB]
    }
    return resultobj
}

const expandTypeInPacov = (pacovtypes, pacov) => {
    console.log("running expandTypeInPacov with this data:", pacovtypes, pacov)
    const pacovobj = pacov
    pacovobj.type = pacovtypes[pacov.type]
    return pacovobj
}

const expandTypeInRelation = (relationtypes, relation) => {
    console.log("running expandTypeInRelation with this data:", relationtypes, relation)
    const relationobj = relation
    relationobj.type = relationtypes[relation.type]
    return relationobj
}

// Takes relations, keeps the ones where either A og B is pacov, 
// alligns them so that pacov is in A
// Returns Obj
const allignRelationsByPacov = (relations, pacov) => {
    console.log("running allignRelationsByPacov with this data:", relations, pacov)
    let resultobj = {}
    for (let relation in relations) {
        if (pacov.uuid === relations[relation].pacovA) {
            resultobj[relation] = relations[relation]
        }
        else if (pacov.uuid === relations[relation].pacovB) {
            resultobj[relation] = relations[relation]
            let tempA = relations[relation].pacovA
            let tempB = relations[relation].pacovB
            resultobj[relation].pacovA = tempB
            resultobj[relation].pacovB = tempA
        }
    }
    return resultobj
}

let userrepresentaionobj = {}
userrepresentaionobj.userrole = filtered_relations[relation][KEY.ROLE_NAME]
userrepresentaionobj.organization = filtered_relations[relation].pacovB.name
userrepresentaionobj.value = relation
// Add to List
resultlist.push(userrepresentaionobj)



STATE
meeting_scheme: filterService.findCategoryScheme(this.props.schemes, PACOV_ID.MEETING),
topics: this.getTopics(),
persons: this.getPersons(),
selected_meeting_uuid: "",

getTopics = () => filterService.filterPacovsByCategory(this.props.pacovs, PACOV_ID.TOPIC)
getPersons = () => filterService.filterPacovsByCategory(this.props.pacovs, PACOV_ID.PERSON)
getMeetings = () => filterService.filterPacovsByCategory(this.props.pacovs, PACOV_ID.MEETING)
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
