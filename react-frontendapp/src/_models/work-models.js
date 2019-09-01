
const meetingpacov = {
    uuid: "",
    type: 34,
    started: Date, //Meeting start
    ended: Date, //Meeting end
    meeting_type: "",
}

const requestpacov = {
    type: 9,
    started: Date, //Request sent (if not, meeting call is a draft)
    ended: Date, 
    suggested_date: Date,
}
const meetingrelation = {		
    uuid: "",      
    name: "",      
    type: 20,      
    pacovA: "",
    pacovB: "",
    started: null,
    ended: null,
    idcode: "",
    question: null,
    specific_data: null,
}
// Meetings Objlist
const Meetingobj = {
    id: null,
    suggested_date: Date,
    type: "",
    organization: "uuid",
    status: null, //Choices 1=Draft, 2=Call sent, 3=Ongoing, 4=Completed
    start: date,
    end: date,
    participants: [{
        person_pacov: "uuid",
        invite_accepted: false
    }],
    meetingtopics: {
        topic_pacov: "uuid",
        listposition: 0,
        description: ""      
    }
}

const MEETINGRELATION_TYPE = 20
const MEETINGPACOV_TYPE = 34
const REQUESTPACOV_TYPE = 9
const ORGANIZATIONRELATION = 20

