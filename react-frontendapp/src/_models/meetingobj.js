class MeetingObject {
    constructor() {
        // Additional properties to add to regular meeting pacov.
        this.participants = []
        this.topics = []
        this.getStatus = () => {
            let meetingstatus = ""
            if (!this.request_start) {
                meetingstatus = "DRAFT"
            }
            if (this.request_start) {
                meetingstatus = "CALLED"
            }
            if (this.meeting_start) {
                meetingstatus = "ONGOING"
            }
            if (this.meeting_end) {
                meetingstatus = "COMPLETED"
            }
            return meetingstatus   
        }
    }
}

export default MeetingObject

class MeetingObj {
    constructor() {
        this.executive_entity = "entity_uuid";
        this.topics = []
        this.participants = []
        this.getStatus = () => {
            let meetingstatus = ""
            if (!this.requested) {
                meetingstatus = "DRAFT"
            }
            if (this.requested) {
                meetingstatus = "CALLED"
            }
            if (this.started) {
                meetingstatus = "ONGOING"
            }
            if (this.ended) {
                meetingstatus = "COMPLETED"
            }
            if (this.reported) {
                meetingstatus = "REPORTED"
            }
            return meetingstatus   
        }
    }
}
