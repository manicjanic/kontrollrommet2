const ID = {
    // PACOV Core Type IDs
    // PACOV Category IDs
    MEETING_ID: 2,
    TOPIC_ID: 8,
    COMPANY_ID: 3,
    INVITE_ID: 10, //(Action)
    // Relation Type IDs
    // MEETING RELATED
    INVITER_ID: 4, //(Expresser)
    INVITEE_ID: 5, //(Receiver)
    EVENT_IN_QUESTION_ID: 7,
    HOST_ID: 9,
    PARTICIPANT_ID: 8,
    MEETING_TOPIC_ID: 10,
    EXECUTIVE_ENTITY_ID: 11,
    ROLE_ID: 3,
    OWNERSHIP_ID: 2
} 

const KEY = {
    PERSON_FIRSTNAME: "person_firstname",
    PERSON_LASTNAME: "person_lastname",
    ROLE_NAME: "role_type_name",
    MEETING_TYPE: "meeting_type_name",
    SUGGESTED_MEETINGDATE: "suggested_meetingdate"
}
Object.freeze(ID)
Object.freeze(KEY)
export {ID, KEY}