import React, { Component } from 'react';
import {dataService} from '../_services/data-service'
import {filterService} from '../_services/filter-service'
import { withRouter } from 'react-router'


class Loader extends Component {
  
    constructor(props){
        super(props);
    }

     // Initial operations
    componentDidMount() {
        const fetchData = async () => {
            // Get the data
            let [
                peppar_types, 
                relation_types, 
                all_peppars_raw, 
                all_relations_raw
            ] = await Promise.all([
                dataService.getPepparTypes(),
                dataService.getRelationTypes(),
                dataService.getPeppars(), 
                dataService.getRelations(),
            ]);
            
            const processPeppars = (peppars) => {
                let lookuplist = [
                    {idkey: "peppar_type", referencelist: peppar_types}
                ]
                let data = peppars
                data = filterService.add_id(data)
                data = filterService.add_nesteddata(data, lookuplist)
                let outdata = data
                return outdata
            }
            
            const processRelations = (relations, me_peppar) => {
                let lookuplist = [
                    {idkey: "peppar_type", referencelist: peppar_types},
                    {idkey: 'relation_type', referencelist: relation_types},
                ]
                let data = relations
                data = filterService.AlignObjects(data, me_peppar)
                data = filterService.add_id(data)
                data = filterService.add_nesteddata(data, lookuplist)
                let outdata = data
                return outdata
            }
            let me_peppar_raw = filterService.findMePeppar(all_peppars_raw)
            let all_Peppars = processPeppars(all_peppars_raw)
            let all_Relations = processRelations(all_relations_raw, me_peppar_raw)
            // Set state with the processed data
            // Catalog
            this.props.modifyState({
                'peppar_Types': peppar_types,
                'relation_Types': relation_types,
                // Full Peppars and Relations lists
                'all_Peppars': all_Peppars,
                'all_Relations': all_Relations
            })
            // Derived Peppar and Relation lists
            this.props.modifyState({
                "me_Peppar": filterService.findMePeppar(this.props.getState('all_Peppars'))
            })
            this.props.modifyState({
                'my_Entity_Relations': filterService.getMyRelations(
                    this.props.getState("me_Peppar"),
                    this.props.getState("all_Relations"),
                    "ENTITY"
                )
            })
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
