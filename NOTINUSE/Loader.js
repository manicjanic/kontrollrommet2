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
            
            // Gives Peppars ID and adds nested object data
            const processPeppars = (peppars) => {
                let lookuplist = [
                    {idkey: "peppar_type", referencelist: peppar_types}
                ]
                let data = peppars
                data = filterService.addID(data)
                data = filterService.extractAddedData(data)
                data = filterService.replaceForeignKeyWithObject(data, lookuplist)
                let outdata = data
                return outdata
            }

            // Gives Relations ID and adds nested object data
            const processRelations = (relations, me_peppar) => {
                let lookuplist = [
                    {idkey: "peppar_type", referencelist: peppar_types},
                    {idkey: 'relation_type', referencelist: relation_types},
                ]
                let data = relations
                data = filterService.alignRelations(data, me_peppar)
                data = filterService.addID(data)
                data = filterService.replaceForeignKeyWithObject(data, lookuplist)
                let outdata = data
                return outdata
            }
            let me_peppar_raw = filterService.findMePeppar(all_peppars_raw)
            let all_Peppars = processPeppars(all_peppars_raw)
            let all_Relations = processRelations(all_relations_raw, me_peppar_raw)
            
            // Set state with the processed data
            this.props.modifyState({
                // Catalog
                'peppar_Types': peppar_types,
                'relation_Types': relation_types,
                // Full Peppars and Relations lists
                'all_Peppars': all_Peppars,
                'all_Relations': all_Relations
            })
            // Derives derived Peppar and Relation lists
            let me_peppar = filterService.findMePeppar(this.props.getState('all_Peppars'))
            let my_relations = filterService.findRelationsFromPeppar(
                this.props.getState("all_Relations"),
                me_peppar)
            let my_peppars = filterService.findPepparsFromRelations(my_relations, this.props.getState('all_Peppars'), "B")
            let my_entity_relations = filterService.findRelationsByType(
                my_relations, 'PER-ENT')
            this.props.modifyState({
                "me_Peppar": me_peppar,
                'my_Relations': my_relations,
                'my_Peppars': my_peppars,
                'selected_Entity_Relation': my_entity_relations[0]
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
