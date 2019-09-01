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

export default MeetingObj