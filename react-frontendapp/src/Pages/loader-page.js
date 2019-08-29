import React, { Component } from 'react';
import {dataService} from '../_services/data-service'
import {filterService} from '../_services/filter-service'
import {ConstructionService} from '../_services/construction-service'

export default class LoaderPage extends Component {
    
    fetchData = async () => {
        this.setState({loading: true})
        // Get the data async in one promise
        const getlist = [{
            name: "pacovs",
            url: "api/user/pacovs/"
        },{
            name: "relations",
            url: "api/user/relations"
        },{
            name: "category",
            url: "api/catalog/category",
        },{
            name: "relationtype",
            url: "api/catalog/relationtype"
        },{
            name: "defaultschemes",
            url: "api/catalog/defaultscheme"
        }
    ]
        const resultlist = await Promise.all(getlist.map((item) => dataService.getDataAuth(item.url)))
        let resultobj = {}
        getlist.forEach((element, index) => {
            resultobj[element.name] = resultlist[index]
        })
        // Construct data for use in Frontend State
        let category = ConstructionService.constructCatalogListObject(resultobj.category)
        let relationtype = ConstructionService.constructCatalogListObject(resultobj.relationtype)
        let defaultschemes = resultobj.defaultschemes
        let pacovs = ConstructionService.constructPacovsListObject(resultobj.pacovs)
        let relations = ConstructionService.constructPacovsListObject(resultobj.relations)
        // Find userpacov and Extract for State
        const userpacov = Object.values(filterService.findPacovsByLevel(pacovs, "0"))[0]
        // Make Lists for State
        const userrepresentations_list = ConstructionService.constructUserRepresentationsList(relations, userpacov, pacovs)
        // Set State with prepared data
        this.props.modifyState({
            category: category,
            relationtype: relationtype,
            defaultschemes: defaultschemes,
            pacovs: pacovs, 
            relations: relations,
            userpacov: userpacov,
            user_representations: userrepresentations_list,
            selected_representation: userrepresentations_list[0],
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