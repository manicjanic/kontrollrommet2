// GLOBAL CONSTANTS
// PACOV Category IDs
const PACOV_ID = {
    MEETING: 2,
    COMPANY: 3,
    PERSON: 5,
    TOPIC: 8,
    REQUEST: 10, //(Action)
    // To be removed
    INVITE: 10, //(Action)
}

// Relation Type IDs
const RELATION_ID = {
    OWNERSHIP: 2,
    ROLE: 3,
    // MEETING RELATED
    INVITER: 4, //(Expresser)
    INVITEE: 5, //(Receiver)
    MEETING_TOPIC: 6,
    EVENT_IN_QUESTION: 7,
    PARTICIPANT: 8,
    HOST: 9,
    REQUEST_TOPIC: 10,
    EXECUTIVE_ENTITY: 11,
} 

const KEY = {
    PERSON_FIRSTNAME: "person_firstname",
    PERSON_LASTNAME: "person_lastname",
    ROLE_NAME: "role_type_name",
    MEETING_TYPE: "meeting_type_name",
    SUGGESTED_MEETINGDATE: "suggested_meetingdate"
}

Object.freeze(PACOV_ID)
Object.freeze(RELATION_ID)
Object.freeze(KEY)
export {PACOV_ID, RELATION_ID, KEY}

let scheme = {
    extended_data: {
        suggested_meetingdate: "Date",
        meeting_type_name: "String"
    },
    formdata: {
        meeting_type_choices: [
            {meeting_type_name:"Styremøte",
            id:"1"},
            {meeting_type_name:"Arbeidsmøte",
            id:"2"}
        ]
   }
}