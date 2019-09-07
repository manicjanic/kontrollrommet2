import React, { Component } from 'react';
import {dataService} from '../_services/data-service'
import {filterService} from '../_services/filter-service'
import {constructionService} from '../_services/construction-service'

    // List over datas to get from server
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

export default class LoaderPage extends Component {
    
    fetchData = async () => {
        this.setState({is_loading: true})
        // Get all data from server as an Array of results
        const resultlist = await Promise.all(API_REQUEST_LIST.map((item) => dataService.getDataAuth(item.url)))
        // Construct Objects for use in Frontend State 
        let stateobj = {}
        API_REQUEST_LIST.forEach((element, index) => {
            stateobj[element.name] = constructionService.constructListObj(resultlist[index], element.idkey) 
        })
        // Flatten added_ and specific_ data in Pacovs and Relations 
        stateobj.pacovs = constructionService.flattenData(stateobj.pacovs, "insight_data")
        stateobj.relations = constructionService.flattenData(stateobj.relations, "insight_data")
        stateobj.pacovs = constructionService.flattenData(stateobj.pacovs, "specific_data")
        stateobj.relations = constructionService.flattenData(stateobj.relations, "specific_data")
        // Find user_pacov and Extract for State
        stateobj.user_pacov = Object.values(filterService.filterPacovsByLevel(stateobj.pacovs, "0"))[0]
        // Make Custom Produced Objects for State
        const {pacovs, relations, user_pacov} = stateobj
        stateobj.user_roles = dataService.getLocal_user_roles_expanded(relations, user_pacov, pacovs)
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