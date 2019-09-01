
// Construct ListObj
const constructListObj = (data_list, idkey) => {
    let listobj = {}
   data_list.forEach((item) => {
        listobj[item[idkey]] = item
    })
    return listobj    
}

// Flatten nested property in object
const flattenData = (listobj, nestkey) => {
    let resultobj = listobj
    for (let key in resultobj) {
        let obj = resultobj[key]
        for (let deepkey in obj[nestkey]) {
            obj[deepkey] = obj[nestkey][deepkey]  
        }
        delete obj[nestkey]
        resultobj[key] = obj
    }
    return resultobj
}

export const ConstructionService = {
    constructListObj,
    flattenData,
}