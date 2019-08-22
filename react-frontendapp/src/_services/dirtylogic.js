import {filterService} from './filter-service'

const makeUserFunctions = (relations, userpacov, pacovs) => {
    // Process and filter relations to get derived Obj
    // Relationtype 17 = Function
    let filtered_relations = filterService.findRelationsByType(relations, 17)    
    filtered_relations = filterService.findRelationsToPacov(filtered_relations, userpacov)
    filtered_relations = filterService.allignRelationsByPacov(filtered_relations, userpacov)
    filtered_relations  = filterService.expandPacovsInRelations(pacovs, filtered_relations)
    // Extract relevant data and construct special dataobj
    let resultlist = []
    for (let relation in filtered_relations) {
        resultlist.push({
            userfunction: filtered_relations[relation].function_name,
            organization: filtered_relations[relation].pacovB.name,
            value: relation,
        })
    }
    return resultlist
}


export const dirtyLogic = {
    makeUserFunctions,
}