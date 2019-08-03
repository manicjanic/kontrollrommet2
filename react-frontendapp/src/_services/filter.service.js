
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