import React, { Component } from 'react';
import {dataService} from '../_services/data.service'
import {filterService} from '../_services/filter.service'
import { withRouter } from 'react-router'


class Loader extends Component {
  
    constructor(props){
        super(props);
    }

     // Initial operations
    componentDidMount() {
        const fetchData = async () => {
            // Get the data
            let [pepparType, relationType, me, myPeppars, myRelations] = await Promise.all([
                dataService.getPepparType(),
                dataService.getRelationType(),
                dataService.getMe(),
                dataService.getPeppars(), 
                dataService.getRelations(),
            ]);
            // Manipulate to use in fronend solution
            let alignedrelations_nested = filterService.align_and_addnest_relations(me, myRelations, pepparType, relationType)
            let me_nested_array = filterService.addNestPeppar([me,], pepparType)
            let me_nested = me_nested_array[0]
            let myPeppars_nested = filterService.addNestPeppar(myPeppars, pepparType)
            let myentityrelations = filterService.get_specified_myrelations(me_nested, alignedrelations_nested, "ENTITY")
            // Set state with the processed data
            // Catalog
            this.props.ModifyState('pepparType', pepparType)
            this.props.ModifyState('relationType', relationType)
            // Base Peppars and Relations lists
            this.props.ModifyState('mePeppar', me_nested)
            this.props.ModifyState('myPeppars', myPeppars_nested)
            this.props.ModifyState('myRelations', alignedrelations_nested)
            // Derived Peppar and Relation lists
            this.props.ModifyState('myEntityRelations', myentityrelations)

            this.props.history.push('/')
        }
        fetchData()
    }

    render() {
        return (
            <div>
                Loading...
            </div>
        )
    }
}
   
export default withRouter(Loader);
