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
            let [pepparType, relationType, me, myPeppars, myRelations] = await Promise.all([
                dataService.getPepparType(),
                dataService.getRelationType(),
                dataService.getMe(),
                dataService.getPeppars(), 
                dataService.getRelations(),
            ]);
            let alignedrelations_nested = filterService.align_and_addnest_relations(me, myRelations, pepparType, relationType)
            let me_nested_array = filterService.addNestPeppar([me,], pepparType)
            let me_nested = me_nested_array[0]
            let myPeppars_nested = filterService.addNestPeppar(myPeppars, pepparType)
            this.props.ModifyState('pepparType', pepparType)
            this.props.ModifyState('relationType', relationType)
            this.props.ModifyState('mePeppar', me_nested)
            this.props.ModifyState('myPeppars', myPeppars_nested)
            this.props.ModifyState('myRelations', alignedrelations_nested)
            
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
