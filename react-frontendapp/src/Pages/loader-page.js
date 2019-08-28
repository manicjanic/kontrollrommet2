import React, { Component } from 'react';
import {dataService} from '../_services/data-service'
import {filterService} from '../_services/filter-service'
import {ConstructionService} from '../_services/construction-service'

export default class LoaderPage extends Component {
    
    fetchData = async () => {
        this.setState({loading: true})
        // Get the data async in one promise
        const [
            pacovtypes_list, 
            relationtypes_list,
            pacovsubtypes_list,
            relationsubtypes_list, 
            pacovs_list, 
            relations_list,
        ] = await Promise.all([
            dataService.getPacovTypes(),
            dataService.getRelationTypes(),
            dataService.getPacovSubTypes(),
            dataService.getRelationSubTypes(),
            dataService.getPacovs(), 
            dataService.getRelations(),
        ]);
        // Construct data for use in Frontend State
        let pacovtypes = ConstructionService.constructCatalogListObject(pacovtypes_list)
        let relationtypes = ConstructionService.constructCatalogListObject(relationtypes_list)
        let pacovsubtypes = ConstructionService.constructCatalogListObject(pacovsubtypes_list)
        let relationsubtypes = ConstructionService.constructCatalogListObject(relationsubtypes_list)

        let pacovs = ConstructionService.constructPacovsListObject(pacovs_list)
        let relations = ConstructionService.constructPacovsListObject(relations_list)
        // Find userpacov and Extract for State
        const userpacov = Object.values(filterService.findPacovsByLevel(pacovs, "0"))[0]
        // Make Lists for State
        const userrepresentations_list = ConstructionService.constructUserRepresentationsList(relations, userpacov, pacovs)
        // Set State with prepared data
        this.props.modifyState({
            pacovtypes: pacovtypes,
            relationtypes: relationtypes,
            pacovsubtypes: pacovsubtypes,
            relationsubtypes: relationsubtypes,
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