let Pepparlist = [
    {
        "uuid": "769f3171-d334-45aa-8727-092755a5c066",
        "level": "0",
        "peppar_uuid": "f28ca1f1-1880-4f3d-b656-2bf59d7557fa",
        "peppar_name": "Janic Heen",
        "peppar_type": 1,
        "added_data": {
            "peppar_nameA": "Janic",
            "peppar_nameB": "Heen",
            "peppar_dateA": "1975-11-11T08:00:00Z",
            "peppar_dateB": null,
            "peppar_idcode": "",
            "peppar_question": true
        }
    },
    {
        "uuid": "70bdb652-ffe7-4f93-8126-85499d85acfd",
        "level": "2",
        "peppar_uuid": "b1802261-f26a-463c-b968-85c9f3973e46",
        "peppar_name": "John Holmes",
        "peppar_type": 1,
        "added_data": {
            "peppar_nameA": "John",
            "peppar_nameB": "Holmes"
        }
    },
    {
        "uuid": "9adf4385-fc8d-4953-97f6-24ac4e751a26",
        "level": "1",
        "peppar_uuid": "e1720166-b255-4be8-8561-20a448aaf538",
        "peppar_name": "Prompelia Borettslag ",
        "peppar_type": 2,
        "added_data": {
            "peppar_nameA": "Prompelia Borettslag",
            "peppar_nameB": "",
            "peppar_dateA": null,
            "peppar_dateB": null,
            "peppar_idcode": "",
            "peppar_question": null
        }
    },
    {
        "uuid": "34f4a2fd-0c72-4489-a573-40ed2ff067b8",
        "level": "1",
        "peppar_uuid": "3de76245-457c-4961-bad1-ededffeea803",
        "peppar_name": "Rævåsen Borettslag ",
        "peppar_type": 2,
        "added_data": {
            "peppar_nameA": "Rævåsen Borettslag",
            "peppar_nameB": "",
            "peppar_dateA": null,
            "peppar_dateB": null,
            "peppar_idcode": "",
            "peppar_question": false
        }
    },
    {
        "uuid": "ce672172-ddb0-4a84-a20f-d99ba0a1919a",
        "level": "1",
        "peppar_uuid": "48407391-7940-44a8-812b-5d3e448a880f",
        "peppar_name": "Styremøte Prompelia Borettslag",
        "peppar_type": 4,
        "added_data": {
            "peppar_nameA": "Styremøte",
            "peppar_nameB": "Prompelia Borettslag",
            "peppar_dateA": "2019-08-20T18:00:00Z",
            "peppar_dateB": null,
            "peppar_idcode": "",
            "peppar_question": false
        }
    }
]

let Relationlist = [
    {
        "uuid": "c972aa0f-b4fb-4123-9448-3a7c6fad8ccd",
        "level": "1",
        "relation_uuid": "47543ef4-3b80-4e0f-ab49-785907c3a2bb",
        "relation_type": 1,
        "relation_name": "Janic Heen - Styreleder - Prompelia Borettslag",
        "pepparA": {
            "peppar_type": 1,
            "peppar_uuid": "f28ca1f1-1880-4f3d-b656-2bf59d7557fa",
            "peppar_name": "Janic Heen"
        },
        "pepparB": {
            "peppar_type": 2,
            "peppar_uuid": "e1720166-b255-4be8-8561-20a448aaf538",
            "peppar_name": "Prompelia Borettslag "
        },
        "added_data": {
            "relation_dateA": null,
            "relation_dateB": null,
            "relation_idcode": "",
            "relation_question": null
        }
    },
    {
        "uuid": "d6e818df-a2fe-4a53-9c8b-a71e934608d1",
        "level": "1",
        "relation_uuid": "0bf0f008-028a-4470-b402-01c2fc8fc07b",
        "relation_type": 2,
        "relation_name": "Janic Heen - Styremedlem - Rævåsen Borettslag ",
        "pepparA": {
            "peppar_type": 1,
            "peppar_uuid": "f28ca1f1-1880-4f3d-b656-2bf59d7557fa",
            "peppar_name": "Janic Heen"
        },
        "pepparB": {
            "peppar_type": 2,
            "peppar_uuid": "3de76245-457c-4961-bad1-ededffeea803",
            "peppar_name": "Rævåsen Borettslag "
        },
        "added_data": {
            "relation_dateA": null,
            "relation_dateB": null,
            "relation_idcode": "",
            "relation_question": null
        }
    }
]

let relationtypelist = [{
        "id": 1,
        "name": "Styreleder",
        "type": "PER-ENT"
    },
    {
        "id": 2,
        "name": "Styremedlem",
        "type": "PER-ENT"
    },
    {
        "id": 3,
        "name": "Møteinnkaller",
        "type": "PER-PLA"
    },
    {
        "id": 4,
        "name": "Møteinnkalt",
        "type": "PER-PLA"
    },
    {
        "id": 5,
        "name": "Gjeldende entitet",
        "type": "ENT-PLA"
    }
]

let peppartypelist = [{
        "id": 1,
        "name": "Person",
        "type": "PERSON"
    },
    {
        "id": 2,
        "name": "Borettslag",
        "type": "ENTITY"
    },
    {
        "id": 3,
        "name": "Sameie",
        "type": "ENTITY"
    },
    {
        "id": 4,
        "name": "Møteinnkalling",
        "type": "PLAN"
    },
    {
        "id": 5,
        "name": "Møteinnkallings-punkt (Agenda)",
        "type": "PLAN"
    }
]

let lookuplist = [
    {idkey: 'relation_type_id', referencelist: relationtypelist},
    {idkey: "type", referencelist: peppartypelist}
]

// Finds correspondins PEPPARs from a list of relations. Optional argument to choose A-end, B-end only
const findPepparsFromRelation = (relations, peppars, end) => {
    console.log("running findPepparsFromRelation with this relations list:", relations, peppars)
    let result = []
    relations.forEach(relation => {
        console.log("Working in this relation:", relation)
        if (end === "A" || end === undefined) {
            console.log("Checking to find PepparA...")
            var pepparA = peppars.find(peppar => {
            	console.log("comparing A", peppar.peppar_uuid, relation.pepparA.peppar_uuid)
                return peppar.peppar_uuid === relation.pepparA.peppar_uuid
            })
            
        }
        if (end === "B" || end === undefined) {
            console.log("Checking to find PepparB...")
            var pepparB = peppars.find(peppar => {
                console.log("comparing B", peppar.peppar_uuid, relation.pepparB.peppar_uuid)
                return peppar.peppar_uuid === relation.pepparB.peppar_uuid
            })
    
        }
        console.log("Peppar A and B", pepparA, pepparB)
        if ((pepparA) && (!result.includes(pepparA))) {
            result.push(pepparA)
        }
        if ((pepparB) && (!result.includes(pepparB))) {
            result.push(pepparB)
        }
    	console.log("result pr. now:", result)
    })
    return result
}