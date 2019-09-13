// React Modules
import React, { Component } from 'react';
// Helpers and Services
import {dataService} from '../_services/data-service'
import {filterService} from '../_services/filter-service'
import {constructionService} from '../_services/construction-service'
import {PACOV_ID, RELATION_ID} from '../Hardcoded/lookup-table'

    // Static List over data to get from server
    const API_REQUEST_LIST = [{
        name: "pacovs",
        idkey: "uuid",
        url: "api/user/pacov/"},{
        name: "relations",
        idkey: "uuid",
        url: "api/user/relation"},{
        name: "category",
        idkey: "id",
        url: "api/catalog/category",},{
        name: "relationtype",
        idkey: "id",
        url: "api/catalog/relationtype" },
    ]

// Loader Page Component
export default class LoaderPage extends Component {
    
    // API Call to Server to get all basic data
    fetchData = async () => {
        this.props.alterState({is_loading: true})
        // Get all data from server as an Array of results
        const responselist = await Promise.all(API_REQUEST_LIST.map((item) => dataService.getDataAuth(item.url)))
        // Construct Objects for use in Frontend State 
        let stateobj = {}
        API_REQUEST_LIST.forEach((element, index) => {
            stateobj[element.name] = constructionService.constructListObj(responselist[index], element.idkey) 
        })
        // Flatten insight_data in Pacovs and Relations 
        stateobj.pacovs = constructionService.flattenData(stateobj.pacovs, "insight_data")
        stateobj.relations = constructionService.flattenData(stateobj.relations, "insight_data")
        // Find user_pacov and Extract for State
        stateobj.user_pacov = Object.values(filterService.filterPacovsByLevel(stateobj.pacovs, "0"))[0]
        // Make Custom Produced Objects for State
        const {pacovs, relations, user_pacov} = stateobj
        const user_relations = filterService.findRelationsToPacov(relations, user_pacov)
        stateobj.user_roles = filterService.filterRelationsByType(user_relations, RELATION_ID.ROLE)
        // Set selection to first on list
        stateobj.selected_user_role = Object.values(stateobj.user_roles)[0]      
        // Set Loading to false in the end of State alteration
        stateobj.is_loading = false
        // Set State with prepared data
        this.props.alterState(stateobj)
    }
    
    componentDidMount() {
        this.fetchData()
        // Move to Home Page
        this.props.history.push('/')
    }

    render() {return <div></div>}

}