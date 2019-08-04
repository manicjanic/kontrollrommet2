
// Filter to get relations to user's Peppar, by type
const getMyRelations = (me, relations, type) => {
    let result = relations.filter(obj => {
        return ( 
            (obj.pepparA.peppar_uuid === me.peppar_uuid) && (obj.pepparB.peppar_type.type == type)
        )
    })
    return result
    } 

const findMePeppar = (peppars) => {
    let me = peppars.find(peppar => {
        return peppar.level == "0"
    })
    return me
}



// Adds an ID to objects in objectlist
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
const AlignObjects = (objectlist, origo_object) => {
    console.log("Aligning objects...")
    console.log(objectlist, origo_object)
    let result = objectlist.map((object, i) => {
        console.log("checing if this object needs alignement", object)
        if (object.pepparB.peppar_uuid == origo_object.peppar_uuid) {
            console.log("since", object.pepparB.peppar_uuid, origo_object.peppar_uuid, "i will swap")
            let swapperA = object.pepparB
            let swapperB = object.pepparA
            object.pepparA = swapperA
            object.pepparB = swapperB
        }
        return object
    })
    console.log("no more objects to align")
    return result
}

export const filterService = {
    add_id,
    add_nesteddata,
    findMePeppar,
    getMyRelations,
    AlignObjects
}

