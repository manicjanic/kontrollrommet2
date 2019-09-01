import React, { Component } from 'react';
import {dataService} from '../_services/data-service'
import {filterService} from '../_services/filter-service'
import {ConstructionService} from '../_services/construction-service'
import {ProductionService} from '../_services/production-service'

    // List over datas to get from server
    const API_REQUEST_LIST = [{
        name: "pacovs",
        idkey: "uuid",
        url: "api/user/pacovs/"},{
        name: "relations",
        idkey: "uuid",
        url: "api/user/relations"},{
        name: "category",
        idkey: "id",
        url: "api/catalog/category",},{
        name: "relationtype",
        idkey: "id",
        url: "api/catalog/relationtype" },
    ]

export default class LoaderPage extends Component {
    
    fetchData = async () => {
        this.setState({is_loading: true})
        // Get all data from server as an Array of results
        const resultlist = await Promise.all(API_REQUEST_LIST.map((item) => dataService.getDataAuth(item.url)))
        // Construct Objects for use in Frontend State 
        let stateobj = {}
        API_REQUEST_LIST.forEach((element, index) => {
            stateobj[element.name] = ConstructionService.constructListObj(resultlist[index], element.idkey) 
        })
        // Flatten added_ and specific_ data in Pacovs and Relations 
        stateobj.pacovs = ConstructionService.flattenData(stateobj.pacovs, "added_data")
        stateobj.relations = ConstructionService.flattenData(stateobj.relations, "added_data")
        stateobj.pacovs = ConstructionService.flattenData(stateobj.pacovs, "specific_data")
        stateobj.relations = ConstructionService.flattenData(stateobj.relations, "specific_data")
        // Find userpacov and Extract for State
        stateobj.userpacov = Object.values(filterService.filterPacovsByLevel(stateobj.pacovs, "0"))[0]
        // Make Custom Produced Objects for State
        const {pacovs, relations, userpacov} = stateobj
        stateobj.user_roles = ProductionService.produceUserRoles(relations, userpacov, pacovs)
        // Set selection to first on list
        stateobj.selected_user_role = Object.keys(stateobj.user_roles)[0]        
        // Set Loading to false in the end of State alteration
        stateobj.is_loading = false
        // Set State with prepared data
        this.props.alterState(stateobj)
        // Move to Home Page
        this.props.history.push('/')    
    }
    
    componentDidMount() {
        this.fetchData()
    }

    render() {
        return ( <div></div> );
    }

}