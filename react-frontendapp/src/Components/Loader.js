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
            let [pepparType, relationType, myPeppars_raw, myRelations_raw] = await Promise.all([
                dataService.getPepparType(),
                dataService.getRelationType(),
                dataService.getPeppars(), 
                dataService.getRelations(),
            ]);
            // Manipulate to use in fronend solution
            const myPeppars = (myPeppars_raw) => {
                console.log("pep-raw", myPeppars_raw)
                // Add ID
                let firstchurn = myPeppars_raw.map((peppar, i) => {
                    peppar.id = i
                    return peppar
                })
                // Add nested data
                let secondchurn = filterService.addNestPeppar(firstchurn, pepparType)

                return secondchurn
            }

            const myRelations = (myRelations_raw) => {
                let firstchurn = myRelations_raw.map((relation, i) => {
                    relation.id = i
                    return relation 
                })
                let secondchurn = filterService.align_and_addnest_relations(me, firstchurn, pepparType, relationType)
                return secondchurn
            }

            const me = filterService.findMe(myPeppars(myPeppars_raw))
            const myEntityRelations = filterService.get_specified_myrelations

            // Set state with the processed data
            // Catalog
            this.props.ModifyState({
                'pepparType': pepparType,
                'relationType': relationType,
                // Full Peppars and Relations lists
                'myPeppars': myPeppars(myPeppars_raw),
                'myRelations': myRelations(myRelations_raw)
            })
            // Derived Peppar and Relation lists
            this.props.ModifyState({
                "mePeppar": filterService.findMe(this.props.getState('myPeppars'))
            })
            this.props.ModifyState({
                'myEntityRelations': filterService.get_specified_myrelations(
                    this.props.getState("mePeppar"),
                    this.props.getState("myRelations"),
                    "ENTITY"
                )
            })

            // this.props.getState('myPeppars')
            // filterService.findMe()
            // this.props.SetDerivedState('mePeppar', 'myPeppars', filterService.findMe)

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
