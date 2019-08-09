import React, { Component } from 'react';
import {Nav} from 'react-bootstrap'

import {filterService} from '../_services/filter-service'

import NavBar from './NavBar';

class Navigator extends Component {
  
    constructor(props){
        super(props);
        // Set Local State

        // Bind functions so they can access this
        this.findMyEntityRelations = this.findMyEntityRelations.bind(this);
    }

    componentDidMount() {
//        // Set initial value for selection
//        let entity_relations = this.findMyEntityRelations(this.props.my_Relations, 'PER-ENT')
//        console.log("setting state with this initial value:", entity_relations[0])
//        this.props.modifyState({selected_Entity_Relation: entity_relations[0]})
    }

    findMyEntityRelations() {
        return filterService.findRelationsByType(this.props.my_Relations, 'PER-ENT')
    }

    render() {
        return (
            <NavBar 
                is_Loggedin={this.props.is_Loggedin}
                me_Peppar={this.props.me_Peppar}
                selected_Entity_Relation={this.props.selected_Entity_Relation}
                my_Entity_Relations={this.findMyEntityRelations()}
                modifyState={this.props.modifyState}
            />
        )
    }
}
   
export default Navigator;
