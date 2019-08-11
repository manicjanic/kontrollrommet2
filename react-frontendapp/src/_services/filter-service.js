
const findOnId = (id, objects) => {
    console.log("running findOnId with this data:", id, objects)
    let result = objects.find(object => {
        return object.id === id
    })
    return result
}
// Filters list of relations to select where Peppar is in the A-end.
// Takes optional argument to filter by PEPPAR type.
// SearchObj = {peppar: {}, relations: [{}...], type: "PER", end: "A"}
const findRelationsFromPeppar = (relations, peppar) => {
    console.log("running findRelationsFromPeppar with this data:", relations, peppar)
    let result = relations.filter(relation => {    
        return (
            peppar.peppar_uuid === relation.pepparA.peppar_uuid 
            || 
            peppar.peppar_uuid === relation.pepparB.peppar_uuid
        )   
    })
    return result
} 

// Finds correspondins PEPPARs from a list of relations. Optional argument to choose A-end, B-end only
const findPepparsFromRelations = (relations, peppars, end) => {
    console.log("running findPepparsFromRelations with this data:", relations, peppars, end)
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

// Finds relations of specific Type
const findRelationsByType = (relations, type) => {
    console.log("running findRelationsByType with this data:", relations, type)
    let result
    if (typeof type === "string") {
        result = relations.filter(relation => {
            return (relation.relation_type.type === type) 
        })    
    }
    if (typeof type === "number") {
        result = relations.filter(relation => {
            return (relation.relation_type.id === type) 
        })    
    }
    return result
} 

// Finds relations of specific Type
const findPepparsByType = (peppars, type) => {
    console.log("running findPepparsByType with this data:", peppars, type)
    let result
    if (typeof type === "string") {
        result = peppars.filter(peppar => {
            return (peppar.peppar_type.type === type) 
        })
    }
    if (typeof type === "number") {
        result = peppars.filter(peppar => {
            return (peppar.peppar_type.id === type) 
        })
    }
    return result
} 

// Find the Peppar on the other end of a Relation
const findOtherEnd = (relation, peppars, peppar) => {
    if (peppar.peppar_uuid === relation.pepparA.peppar_uuid) {
        return peppars.find(peppar => {
            return peppar.peppar_uuid === relation.pepparB.peppar_uuid
        })
    }
    if (peppar.peppar_uuid === relation.pepparB.peppar_uuid) {
        return peppars.find(peppar => {
            return peppar.peppar_uuid === relation.pepparA.peppar_uuid
        })
    }
}


// Finds MePeppar from a list of Peppars
const findMePeppar = (peppars) => {
    let me = peppars.find(peppar => {
        return peppar.level === "0"
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
                return item.idkey === _property
            })
            if (key) {
                let lookup_object = key.referencelist.find(listitem => {
                    return listitem.id === object[property]
                })
                object[property] = lookup_object
            }
            else if ((typeof object[property] === 'object') && (Array.isArray(object[property]) === false)) {
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
        if (object.pepparB.peppar_uuid === origo_object.peppar_uuid) {
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

const extractAddedData = (objectlist) => {
    console.log("running extractAddedData with this data", objectlist)
    let result = objectlist.map((object) => {
        for (let property in object.added_data) {
            object[property] = object.added_data[property]   
        }
        delete object.added_data
        return object
    })
    console.log("this is the result", result)
    return result
}

export const filterService = {
    addID,
    alignRelations,
    findOnId,
    findMePeppar,
    findRelationsFromPeppar,
    findPepparsFromRelations,
    findRelationsByType,
    findPepparsByType,
    findOtherEnd,
    replaceForeignKeyWithObject,
    extractAddedData  
}