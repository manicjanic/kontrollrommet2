//Search Functions
const findPacovType = (types, typeid) => {
    console.log("running findPacovType with this data:", typeid)
    const pacovtype = types[typeid]
    return pacovtype
}

const findRelationType = (types, typeid) => {
    console.log("running findPacovType with this data:", typeid)
    const pacovtype = types[typeid]
    return pacovtype
}

const findUserPacov = (pacovs) => {
    console.log("running findUserPacov with this data:", pacovs)
    const pacovslist = Object.values(pacovs);
    let user_pacov = pacovslist.find(pacov => {
        return pacov.level === "0"
    })
    return user_pacov
}

const findPacovByUUID = (pacovs, uuid) => {
    console.log("running findPacovByUUID with this data:", pacovs, uuid)
    const pacov = pacovs[uuid]
    return pacov
}
const findPacovsByType = (pacovs, typeid) => {
    console.log("running findPacovsByType with this data:", pacovs, typeid)
    const pacovslist = Object.values(pacovs);
    let resultlist = pacovslist.filter(pacov => {    
        return (
            pacov.type === typeid 
        )   
    })
    return resultlist
}

const findRelationByUUID = (relations, uuid) => {
    console.log("running findRelationByUUID with this data:", uuid, relations)
    const relation = relations[uuid]
    return relation
}

// Returns new object, NOT list
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

// Returns new object, NOT list
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
    findUserPacov,
    findPacovByUUID,
    findPacovsByType,
    findRelationByUUID,
    findRelationsByType,
    findRelationsToPacov,
    expandPacovsInRelations,
    expandTypeInPacov,
    expandTypeInRelation,
    allignRelationsByPacov 
}