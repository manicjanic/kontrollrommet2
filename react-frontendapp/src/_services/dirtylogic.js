import {filterService} from './filter-service'


const findUserRoles = (relations, userpacov, pacovs) => {
    // Process and filter relations to get derived Obj
    // Relationtype 17 = Role
    let filtered_relations = filterService.findRelationsByType(relations, 17)    
    filtered_relations = filterService.findRelationsToPacov(filtered_relations, userpacov)
    filtered_relations = filterService.allignRelationsByPacov(filtered_relations, userpacov)
    filtered_relations  = filterService.expandPacovsInRelations(pacovs, filtered_relations)
    return filtered_relations
}

const makeUserRelationsList = (relations, userpacov, pacovs) => {    
    let filtered_relations = findUserRoles(relations, userpacov, pacovs)
    // Extract relevant data and construct special dataobj
    let resultlist = []
    for (let relation in filtered_relations) {
        resultlist.push({
            userrole: filtered_relations[relation].function_name,
            organization: filtered_relations[relation].pacovB.name,
            value: relation,
        })
    }
    return resultlist
}

const findUserMeetings = (relations, userpacov, pacovs) => {
    // Find all Pacovs containing a Meeting Event = 34
    let filtered_pacovs = filterService.findPacovsByType(pacovs, 34)
    // Find all Relations that relate to a any of the Meeting Events
    for (let pacov in filtered_pacovs) {
        let filtered_relations = filterService.findRelationsToPacov(relations, pacov)
    }
}

export const dirtyLogic = {
    findUserRoles,
    makeUserRelationsList,

}