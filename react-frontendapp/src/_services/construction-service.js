import {filterService} from '../_services/filter-service'

const constructMeetingObjList = (pacovs, relations) => {
    let meetingobjlist = []
    const meetingpacovs = filterService.findPacovsByType(pacovs, 34)
    console.log("meetingpacovs", meetingpacovs)                
    for (let meetingpacov in meetingpacovs) {
        console.log("meetingpacov", meetingpacov)
        let pacov = meetingpacovs[meetingpacov]        
        let meetingrelations = filterService.findRelationsToPacov(relations, pacov)
        console.log("meetinrelations unaligned", meetingrelations)
        // Align so PacovB is the relevant
        meetingrelations = filterService.allignRelationsByPacov(meetingrelations, pacov)
        console.log("meetinrelations aligned", meetingrelations)        
        // Single elements
        let request_relation = Object.values(filterService.findRelationsByType(meetingrelations,19))[0]
        console.log("requestrelation", request_relation)                
        let organization_relation = Object.values(filterService.findRelationsByType(meetingrelations,20))[0]
        console.log("organizationrelation", organization_relation)                        
        let request_pacov = filterService.findPacovByUUID(pacovs, request_relation.pacovB)
        console.log("requestpacov", request_pacov)
        let requestpacov_relations = filterService.findRelationsToPacov(relations, request_pacov)
        requestpacov_relations = filterService.allignRelationsByPacov(requestpacov_relations, request_pacov)                                
        let invitee_relations = filterService.findRelationsByType(requestpacov_relations, 18)
        console.log("inviteerelations", invitee_relations)                
        let meetingobj = {}
        meetingobj.suggested_date = request_pacov.suggested_date
        meetingobj.type = pacov.meeting_type
        meetingobj.organization = filterService.findPacovByUUID(pacovs, organization_relation.pacovB)
        if (!request_pacov.dateA) {
            meetingobj.status = "DRAFT"
        }
        if (request_pacov.dateA) {
            meetingobj.status = "CALLSENT"
        }
        if (pacov.dateA) {
            meetingobj.status = "ONGOING"
        }
        if (pacov.dateB) {
            meetingobj.status = "COMPLETED"
        }
        meetingobj.start = pacov.dateA
        meetingobj.end = pacov.dateB
        meetingobj.participants = []
        for (let invitee_relation in invitee_relations) {
            let participant = {
                person_pacov: filterService.findPacovByUUID(pacovs, invitee_relations[invitee_relation].pacovB), 
                invite_accepted: false
            }
            meetingobj.participants.push(participant)
        }
        meetingobjlist.push(meetingobj)
    }
    return meetingobjlist
}

export const ConstructionService = {
    constructMeetingObjList
    }