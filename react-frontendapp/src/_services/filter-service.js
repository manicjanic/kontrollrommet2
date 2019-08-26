//Search Functions

// PacovType
const findPacovType = (types, typeid) => {
    console.log("running findPacovType with this data:", typeid)
    const pacovtype = types[typeid]
    return pacovtype
}

// RelationType
const findRelationType = (types, typeid) => {
    console.log("running findPacovType with this data:", typeid)
    const pacovtype = types[typeid]
    return pacovtype
}

// Pacovs
const findPacovsByLevel = (pacovs, level) => {
    console.log("running findPacovsByLevel with this data:", pacovs, level)
    let resultobj = {}
    for (let pacov in pacovs) {
        if (pacovs[pacov].level === level) {
            resultobj[pacov] = pacovs[pacov]
        }
    }
    return resultobj
}

const findPacovByUUID = (pacovs, uuid) => {
    console.log("running findPacovByUUID with this data:", pacovs, uuid)
    const pacov = pacovs[uuid]
    return pacov
}

const findPacovsByType = (pacovs, typeid) => {
    console.log("running findPacovsByType with this data:", pacovs, typeid)
    let resultobj = {}
    for (let pacov in pacovs) {
        if (pacovs[pacov].type === typeid) {
            resultobj[pacov] = pacovs[pacov]
        }
    }
    return resultobj
}

// Relations
const findRelationsByLevel = (relations, level) => {
    console.log("running findRelationsByLevel with this data:", relations, level)
    let resultobj = {}
    for (let relation in relations) {
        if (relations[relation].level === level) {
            resultobj[relation] = relations[relation]
        }
    }
    return resultobj
}

const findRelationByUUID = (relations, uuid) => {
    console.log("running findRelationByUUID with this data:", uuid, relations)
    const relation = relations[uuid]
    return relation
}

const findRelationsByType = (relations, typeid) => {
    console.log("running findRelationsByType with this data:", relations, typeid)
    let resultobj = {}
    for (let relation in relations) {
        if (relations[relation].type === typeid) {
            resultobj[relation] = relations[relation]
        }
    }
    return resultobj
}

const findRelationsToPacov = (relations, pacov) => {
    console.log("running findRelationsToPacov with this data:", relations, pacov)
    let resultobj = {}
    for (let relation in relations) {
        if (pacov.uuid === relations[relation].pacovA || pacov.uuid === relations[relation].pacovB) {
            resultobj[relation] = relations[relation]
        }
    }
    return resultobj
}

const expandPacovsInRelations = (pacovs, relations) => {
    console.log("running expandPacovsInRelations with this data:", pacovs, relations)
    const resultobj = relations
    for (let relation in relations) {
        resultobj[relation].pacovA = pacovs[resultobj[relation].pacovA]
        resultobj[relation].pacovB = pacovs[resultobj[relation].pacovB]
    }
    return resultobj
}

const expandTypeInPacov = (pacovtypes, pacov) => {
    console.log("running expandTypeInPacov with this data:", pacovtypes, pacov)
    const pacovobj = pacov
    pacovobj.type = pacovtypes[pacov.type]
    return pacovobj
}

const expandTypeInRelation = (relationtypes, relation) => {
    console.log("running expandTypeInRelation with this data:", relationtypes, relation)
    const relationobj = relation
    relationobj.type = relationtypes[relation.type]
    return relationobj
}

// Takes relations, keeps the ones where either A og B is pacov, 
// alligns them so that pacov is in A
// Returns Obj
const allignRelationsByPacov = (relations, pacov) => {
    console.log("running allignRelationsByPacov with this data:", relations, pacov)
    let resultobj = {}
    for (let relation in relations) {
        if (pacov.uuid === relations[relation].pacovA) {
            resultobj[relation] = relations[relation]
        }
        else if (pacov.uuid === relations[relation].pacovB) {
            resultobj[relation] = relations[relation]
            let tempA = relations[relation].pacovA
            let tempB = relations[relation].pacovB
            resultobj[relation].pacovA = tempB
            resultobj[relation].pacovB = tempA
        }
    }
    return resultobj
}

export const filterService = {
    findPacovType,
    findRelationType,
    findPacovsByLevel,
    findPacovByUUID,
    findPacovsByType,
    findRelationByUUID,
    findRelationsByType,
    findRelationsByLevel,
    findRelationsToPacov,
    expandPacovsInRelations,
    expandTypeInPacov,
    expandTypeInRelation,
    allignRelationsByPacov 
}