
// Filter to get the Peppar that from user's perspective is Me (level 0)
const get_me = (peppars) => {
let result = peppars.find(obj => {
    return obj.level === '0'
})
return result
} 

const get_my_entity_relations = (peppars, relations) => {
    let result = relations.filter(obj => {
        let me = get_me(peppars)
        console.log(obj.pepparA.uuid, me, me.peppar_uuid)
        return ( 
            (obj.pepparB.type === 'ENTITY') && (obj.pepparA.uuid === me.peppar_uuid)
        )
    })
    return result
    } 
    
export const filterService = {
    get_me,
    get_my_entity_relations,
}