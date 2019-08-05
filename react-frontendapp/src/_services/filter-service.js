
// Filters list of relations to select where PepparA is MePeppar.
// Takes optional argument to filter by PEPPAR type.
const findMyRelations = (me, relations, type) => {
    console.log("running findMyRelations with this data:", me, relations, type)
    let result = relations.filter(relation => {
        if (type === undefined) {
            return (relation.pepparA.peppar_uuid === me.peppar_uuid)   
        }
        else
        return (relation.pepparA.peppar_uuid === me.peppar_uuid) && (relation.pepparB.peppar_type.type == type) 
    })
    return result
} 

// Finds relations of specific Type
const findRelationType = (relations, type) => {
    console.log("running findRelationType with this data:", relations, type)
    let result = relations.filter(relation => {
        return (relation.relation_type.type == type) 
    })
    return result
} 

// Finds correspondins PEPPARs from a list of relations. Optional argument to choose A-end, B-end only
const findPepparsFromRelation = (relations, peppars, end) => {
    console.log("running findPepparsFromRelation with this data:", relations, peppars, end)
    let result = []
    relations.forEach(relation => {
        if (end === "A" || end === undefined) {
            var pepparA = peppars.find(peppar => {
                return peppar.peppar_uuid === relation.pepparA.peppar_uuid
            })
            
        }
        if (end === "B" || end === undefined) {
            var pepparB = peppars.find(peppar => {
                return peppar.peppar_uuid === relation.pepparB.peppar_uuid
            })
    
        }
        if ((pepparA) && (!result.includes(pepparA))) {
            result.push(pepparA)
        }
        if ((pepparB) && (!result.includes(pepparB))) {
            result.push(pepparB)
        }
    })
    return result
}

// Finds MePeppar from a list of Peppars
const findMePeppar = (peppars) => {
    let me = peppars.find(peppar => {
        return peppar.level == "0"
    })
    return me
}

// Adds an ID property to objects in objectlist
const addID = (objectlist) => {
    // Add ID
    let result = objectlist.map((object, i) => {
        object.id = i
        return object
    })
    return result
}

// Takes an objectlist, replaces foreignkey fields with nested data objects, 
// based on a reference list
// Objectlist = [{object}...]
// lookuplist = [{idkey: 'keyname', referencelist: [{obj}...]}...]
const replaceForeignKeyWithObject = (objectlist, lookuplist) => {
    console.log ("running replaceForeignKeyWithObject with this data:", objectlist, lookuplist)
    let altered_objectlist = objectlist.map((object) => {
        for (var property in object) {
            let _property = property
            let key = lookuplist.find(item => {
                return item.idkey == _property
            })
            if (key) {
                let lookup_object = key.referencelist.find(listitem => {
                    return listitem.id == object[property]
                })
                object[property] = lookup_object
            }
            else if ((typeof object[property] == 'object') && (Array.isArray(object[property]) === false)) {
                    let propertyobject = object[property]
                    let altered_propertyobject = replaceForeignKeyWithObject([propertyobject], lookuplist)
                    object[property] = altered_propertyobject[0]
            }
        }
        return object
    })
    return altered_objectlist
}

// Alligns object so that relational obj is always in the A-end
const alignRelations = (objectlist, origo_object) => {
    console.log("running aligning relations with this data", objectlist, origo_object)
    let result = objectlist.map((object, i) => {
        if (object.pepparB.peppar_uuid == origo_object.peppar_uuid) {
            console.log("since", object.pepparB.peppar_uuid, origo_object.peppar_uuid, "i will swap")
            let swapperA = object.pepparB
            let swapperB = object.pepparA
            object.pepparA = swapperA
            object.pepparB = swapperB
        }
        return object
    })
    return result
}

export const filterService = {
    addID,
    alignRelations,
    findMePeppar,
    findMyRelations,
    findRelationType,
    replaceForeignKeyWithObject,
    findPepparsFromRelation
}

