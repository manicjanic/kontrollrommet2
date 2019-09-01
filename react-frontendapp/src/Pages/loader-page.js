import React, { Component } from 'react';
import {dataService} from '../_services/data-service'
import {filterService} from '../_services/filter-service'
import {ConstructionService} from '../_services/construction-service'
import {ProductionService} from '../_services/production-service'

export default class LoaderPage extends Component {
    
    fetchData = async () => {
        this.setState({loading: true})
        // List over datas to get from server
        const getlist = [{
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
            url: "api/catalog/relationtype" },{
            name: "defaultschemes",
            idkey: "id",
            url: "api/catalog/defaultscheme"}
        ]
        // Array with all results
        const resultlist = await Promise.all(getlist.map((item) => dataService.getDataAuth(item.url)))
        // Construct Objects for use in Frontend State 
        console.log("resultlist", resultlist)
        let resultobj = {}
        getlist.forEach((element, index) => {
            resultobj[element.name] = ConstructionService.constructListObj(resultlist[index], element.idkey) 
        })
        // Flatten added_ and specific_ data in Pacovs and Relations 
        resultobj.pacovs = ConstructionService.flattenData(resultobj.pacovs, "added_data")
        resultobj.relations = ConstructionService.flattenData(resultobj.relations, "added_data")
        resultobj.pacovs = ConstructionService.flattenData(resultobj.pacovs, "specific_data")
        resultobj.relations = ConstructionService.flattenData(resultobj.relations, "specific_data")
        // Find userpacov and Extract for State
        const userpacov = Object.values(filterService.filterPacovsByLevel(resultobj.pacovs, "0"))[0]
        resultobj.userpacov = userpacov
        // Make Custom Produced Objects for State
        const {pacovs, relations} = resultobj
        const user_roles = ProductionService.produceUserRoles(relations, userpacov, pacovs)
        resultobj.user_roles = user_roles
        // Set selection to first on list
        resultobj.selected_user_role = Object.keys(user_roles)[0]        
        // Set Loading to false in the end of State alteration
        resultobj.loading = false
        // Set State with prepared data
        this.props.alterState(resultobj)
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