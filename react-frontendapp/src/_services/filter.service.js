
// Filter to get relations to user's Peppar, by type
const get_specified_myrelations = (me, relations, type) => {
    let result = relations.filter(obj => {
        return ( 
            (obj.pepparA.uuid === me.peppar_uuid) && (obj.pepparB.typeobj.type === type)
        )
    })
    return result
    } 

const align_and_addnest_relations = (me, relations, pepparType, relationType) => {
    let new_relations = relations.map(relation => {
        // Align the relations so User Peppar is always in the A-end
        if (relation.pepparB.uuid == me.peppar_uuid) {
            let swapperA = relation.pepparB
            let swapperB = relation.pepparA
            relation.pepparA = swapperA
            relation.pepparB = swapperB
        }
        // Add nested data to Type specifictaion PepparA
        let nestA = pepparType.find(type => {
            return relation.pepparA.type === type.id
        })
        relation.pepparA.typeobj = nestA     

        // Add nested data to Type specifictaion PepparA
        let nestB = pepparType.find(type => {
            return relation.pepparB.type === type.id
        })
        relation.pepparB.typeobj = nestB     

        // Add nested data to Relation Type
        let typeobj = relationType.find(type => {
            return relation.relation_type === type.id
        })
        relation.typeobj = typeobj
        return relation   
    })
    return new_relations
}

const addNestPeppar = (peppars, type) => {
    let new_peppars = peppars.map(peppar => {
       let typeobj = type.find(type => {
            return peppar.peppar_type === type.id
        })
        peppar.typeobj = typeobj
        return peppar
    })
    return new_peppars
}

const addNestRelation = (relations, type) => {
    let new_relations = relations.map(relation => {
       let typeobj = type.find(type => {
            return relation.relation_type === type.id
        })
        relation.typeobj = typeobj
        return relation
    })
    return new_relations
}

const findMe = (peppars) => {
    let me = peppars.find(peppar => {
        return peppar.level == "0"
    })
    return me
}

export const filterService = {
    get_specified_myrelations,
    align_and_addnest_relations,
    addNestPeppar,
    addNestRelation,
    findMe
}


    // Adds an ID to object in objectlist
    const add_id = (objectlist) => {
        // Add ID
        let result = objectlist.map((object, i) => {
            object.id = i
            return object
        })
        return result
    }
    
    // Takes and objectlist, Replaces id fields with nested data objects linked to a reference list
    // Objectlist = [{}...]
    // lookuplist = [{idkey: 'akey', referencelist: [{}...]}...]
    const add_nesteddata = (objectlist, lookuplist) => {
        console.log ("starting with this objectlist", objectlist)
        console.log ("mapping through objects")
        let altered_objectlist = objectlist.map((object) => {
            console.log ("here is the object im working on", object)
            for (var property in object) {
                console.log("working on this property:", property)
                let _property = property
                let key = lookuplist.find(item => {
                    console.log("idkey", item.idkey)
                    return item.idkey == _property
                })
            console.log("key", key)
                if (key) {
                    console.log("running prop is id routine")
                    let lookup_object = key.referencelist.find(listitem => {
                        return listitem.id == object[property]
                    })
                    object[property] = lookup_object
                    console.log ("stored a new property on object. Now it looks like this:", object)
                }
                else if ((typeof object[property] == 'object') && (Array.isArray(object[property]) === false)) {
                        console.log("running prop is object routine")
                        let propertyobject = object[property]
                        console.log("this is the property that is an object", propertyobject)
                        let altered_propertyobject = add_nesteddata([propertyobject], lookuplist)
                        console.log("altered propertyobject", altered_propertyobject)
                        object[property] = altered_propertyobject[0]
                }
                console.log("all checks passed")
            }
            console.log("All properties checked. This is the object returned:", object)
            return object
        })
        console.log("altered objectlist", altered_objectlist)
        return altered_objectlist
    }

    // Alligns object so that relational obj is always in the A-end
    const AlignObjects = (origo_object, relationalobjectlist) => {
        let result = relationalobjectlist.map((object, i) => {
            if (object.pepparB.uuid == origo_object.peppar_uuid) {
                let swapperA = object.pepparB
                let swapperB = object.pepparA
                object.pepparA = swapperA
                object.pepparB = swapperB
            }
            return object
        })
        return result
    }
    
    
    // Align the relations so User Peppar is always in the A-end
            if (relation.pepparB.uuid == me.peppar_uuid) {
                let swapperA = relation.pepparB
                let swapperB = relation.pepparA
                relation.pepparA = swapperA
                relation.pepparB = swapperB
            }
            // Add nested data to Type specifictaion PepparA
            let nestA = pepparType.find(type => {
                return relation.pepparA.type === type.id
            })
            relation.pepparA.typeobj = nestA     
    
            // Add nested data to Type specifictaion PepparA
            let nestB = pepparType.find(type => {
                return relation.pepparB.type === type.id
            })
            relation.pepparB.typeobj = nestB     
    
            // Add nested data to Relation Type
            let typeobj = relationType.find(type => {
                return relation.relation_type === type.id
            })
            relation.typeobj = typeobj
            return relation   
        })
        return new_relations
    }
    