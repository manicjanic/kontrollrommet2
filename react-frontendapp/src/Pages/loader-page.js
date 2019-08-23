import React, { Component } from 'react';
import {dataService} from '../_services/data-service'
import {filterService} from '../_services/filter-service'
import {dirtyLogic} from '../_services/dirtylogic'

export default class LoaderPage extends Component {
    
    fetchData = async () => {
        this.setState({loading: true})
        // Get the data async in one promise
        const [
            pacovtypes, 
            relationtypes, 
            pacovs, 
            relations,
        ] = await Promise.all([
            dataService.getPacovTypes(),
            dataService.getRelationTypes(),
            dataService.getPacovs(), 
            dataService.getRelations(),
        ]);
        // Structure data for use in Frontend State
        let pacovtypesObj = {}
        pacovtypes.data.forEach((item, index) => {
            pacovtypesObj[item.id] = item
        })
        // Structure data for use in Frontend State
        let relationtypesObj = {}
        relationtypes.data.forEach((item, index) => {
            relationtypesObj[item.id] = item
        })
        
        // Structure data for use in Frontend State
        let pacovsObj = {}
        pacovs.data.forEach((item, index) => {
            for (let prop in item.added_data) {
                item[prop] = item.added_data[prop]
            }
            delete item.added_data
            if (item.specific_data !== null) {
                for (let prop in item.specific_data) {
                    item[prop] = item.specific_data[prop]
                }
                delete item.specific_data
            }
            pacovsObj[item.uuid] = item
        })
        
        // Structure data for use in Frontend State
        let relationsObj = {}
        relations.data.forEach((item, index) => {
            for (let prop in item.added_data) {
                item[prop] = item.added_data[prop]
            }
            delete item.added_data    
            if (item.specific_data !== null) {
                for (let prop in item.specific_data) {
                    item[prop] = item.specific_data[prop]
                }
                delete item.specific_data
            }
            relationsObj[item.uuid] = item
        })
        // Determine derived state values
        const userpacov = filterService.findUserPacov(pacovsObj)
        const userfunctions = dirtyLogic.makeUserFunctions(relationsObj, userpacov, pacovsObj)
        console.log("userfunctions", userfunctions)
        // Set State with prepared data
        this.props.modifyState({
            pacovtypes: pacovtypesObj,
            relationtypes: relationtypesObj,
            pacovs: pacovsObj,
            relations: relationsObj,
            userpacov: userpacov,
            user_representations: userfunctions,
            selected_function: userfunctions[0],
            loading: false
        })
        
        this.props.history.push('/')
        
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        return ( <div></div> );
    }

}