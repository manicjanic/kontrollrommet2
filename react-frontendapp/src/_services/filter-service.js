//Filter functions

// Find PacovCategory, takes listobj, returns object
const findPacovCategory = (categorys, categoryid) => {
    console.log("running findPacovCategory with this data:", categorys, categoryid)
    const pacovcategory = categorys[categoryid]
    return pacovcategory
}

// Find RelationType, takes listobj, returns object
const findRelationType = (types, typeid) => {
    console.log("running findRelationType with this data:", typeid)
    const pacovtype = types[typeid]
    return pacovtype
}

// Find Pacov by UUID, takes listobj, returns object
const findPacovByUUID = (pacovs, uuid) => {
    console.log("running findPacovByUUID with this data:", pacovs, uuid)
    const pacov = pacovs[uuid]
    return pacov
}

// Find Relation by UUID, takes listobj, returns object
const findRelationByUUID = (relations, uuid) => {
    console.log("running findRelationByUUID with this data:", uuid, relations)
    const relation = relations[uuid]
    return relation
}

// Filter Pacovs by Level, takes listobj, returns listobj
const filterPacovsByLevel = (pacovs, level) => {
    console.log("running filterPacovsByLevel with this data:", pacovs, level)
    let resultobj = {}
    for (let pacov in pacovs) {
        if (pacovs[pacov].level === level) {
            resultobj[pacov] = pacovs[pacov]
        }
    }
    return resultobj
}

// Filter Pacovs by Category, takes listobj, returns listobj
const filterPacovsByCategory = (pacovs, categoryid) => {
    console.log("running filterPacovsByCategory with this data:", pacovs, categoryid)
    let resultobj = {}
    for (let pacov in pacovs) {
        if (pacovs[pacov].category === categoryid) {
            resultobj[pacov] = pacovs[pacov]
        }
    }
    return resultobj
}

// Filter Relations by Level, takes listobj, returns listobj
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

// Filter Relations by type, takes listobj, returns listobj
const filterRelationsByType = (relations, typeid) => {
    console.log("running filterRelationsByType with this data:", relations, typeid)
    let resultobj = {}
    for (let relation in relations) {
        if (relations[relation].type === typeid) {
            resultobj[relation] = relations[relation]
        }
    }
    return resultobj
}

// Filter relations containing Pacov and allign so PAVOV is A
const findRelationsToPacov = (relations, pacov) => {
    if (relations === undefined || pacov === undefined) {return null}
    console.log("running findRelationsToPacov with this data:", relations, pacov)
    let resultobj = {}
    for (let key in relations) {
        if (pacov.uuid === relations[key].pacovA) {
            resultobj[key] = relations[key]
        }
        if (pacov.uuid === relations[key].pacovB) {
            resultobj[key] = relations[key]
            let pacovB = relations[key].pacovB
            resultobj[key].pacovB = relations[key].pacovA
            resultobj[key].pacovA = pacovB 
        }
    }
    return resultobj
}

export const filterService = {
    findPacovCategory,
    findRelationType,
    filterPacovsByLevel,
    findPacovByUUID,
    filterPacovsByCategory,
    findRelationByUUID,
    filterRelationsByType,
    findRelationsByLevel,
    findRelationsToPacov,
}