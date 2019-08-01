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
            let [me, myPeppars, myRelations] = await Promise.all([
                dataService.getMe(),
                dataService.getPeppars(), 
                dataService.getRelations()
            ]);
            let alignedrelations = filterService.alignrelations(me, myRelations)
            console.log("aligned", alignedrelations)
            this.props.ModifyState('mePeppar', me)
            this.props.ModifyState('myPeppars', myPeppars)
            this.props.ModifyState('myRelations', alignedrelations)
            
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
