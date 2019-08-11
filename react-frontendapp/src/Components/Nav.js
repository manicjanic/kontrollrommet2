import React, { Component } from 'react';

import {filterService} from '../_services/filter-service'
import NavBar from './NavBar';

class Navigator extends Component {
  
    constructor(props){
        super(props);
        // Set Local State

        // Bind functions so they can access this
        this.findMyEntityRelations = this.findMyEntityRelations.bind(this);
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
