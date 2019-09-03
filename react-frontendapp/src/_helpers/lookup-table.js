// GLOBAL CONSTANTS
const PACOV_ID = {
    // PACOV Category IDs
    PERSON: 5,
    MEETING: 2,
    TOPIC: 8,
    COMPANY: 3,
    INVITE: 10, //(Action)
}

// Relation Type IDs
const RELATION_ID = {
    // MEETING RELATED
    INVITER: 4, //(Expresser)
    INVITEE: 5, //(Receiver)
    EVENT_IN_QUESTION: 7,
    HOST: 9,
    PARTICIPANT: 8,
    MEETING_TOPIC: 6,
    REQUEST_TOPIC: 10,
    EXECUTIVE_ENTITY: 11,
    ROLE: 3,
    OWNERSHIP: 2
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