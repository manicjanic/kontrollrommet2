import { filterService } from "../_services/filter-service";

// Construct ListObj from array of objects, making a designated key as idkey
const constructListObj = (data_list, idkey) => {
    let listobj = {}
   data_list.forEach((item) => {
        listobj[item[idkey]] = item
    })
    return listobj    
}

// Flatten nested property in object
const flattenData = (listobj, nestkey) => {
    let resultobj = listobj
    for (let key in resultobj) {
        let obj = resultobj[key]
        for (let deepkey in obj[nestkey]) {
            obj[deepkey] = obj[nestkey][deepkey]  
        }
        delete obj[nestkey]
        resultobj[key] = obj
    }
    return resultobj
}

// Add an extra prop called relations to Pacov, containing all relations in expanded form.
const enhancePacovs = (unenhanceds, pacovs, relations) => {
    let resultobj = {}
    for (let key in unenhanceds) {
        let obj = unenhanceds[key]
        let obj_relations = filterService.findRelationsToPacov(relations, obj)
        let obj_relations_expanded = expandPacovsInRelations(pacovs, obj_relations)
        obj.relations = obj_relations_expanded
        console.log("Obj", obj)
        resultobj[key] = obj
    }
    return resultobj
}

// Expand PacovA and B in a Relation to be full objects
const expandPacovsInRelations = (pacovs, relations) => {
    console.log("running expandPacovsInRelation with this data:", pacovs, relations)
    let resultobj = {}
    for (let key in relations) {
        let relation = relations[key]
        relation.pacovA = filterService.findPacovByUUID(pacovs, relation.pacovA)
        relation.pacovB = filterService.findPacovByUUID(pacovs, relation.pacovB)
        resultobj[key] = relation
    }
    return resultobj
}

export const constructionService = {
    constructListObj,
    flattenData,
    enhancePacovs,
    expandPacovsInRelations
}