
// Filter to get relations to user's Peppar, by type
const get_specified_myrelations = (me, relations, type) => {
    let result = relations.filter(obj => {
        return ( 
            (obj.pepparA.uuid === me.peppar_uuid) && (obj.pepparB.type === type)
        )
    })
    return result
    } 

const alignrelations = (me, relations) => {
    console.log("relations input", relations)
    let new_relations = relations.map(relation => {
        if (relation.pepparB.uuid == me.peppar_uuid) {
            let swapperA = relation.pepparB
            let swapperB = relation.pepparA
            relation.pepparA = swapperA
            relation.pepparB = swapperB
        }
        return relation
    })
    console.log("new relations", new_relations)
    return new_relations
}

export const filterService = {
    get_specified_myrelations,
    alignrelations
}