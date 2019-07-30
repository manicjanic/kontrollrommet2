import React, { useEffect } from 'react';
import {dataService} from './_services/data.service'
import {filterService} from './_services/filter.service'
import { withRouter } from 'react-router'

const Loader = (props) => {
    // Upon mounting do this:
    
    useEffect(() => {
        const fetchData = async () => {
            let [peppars, relations] = await Promise.all([dataService.getPeppars(), dataService.getRelations()]);
            props.ModifyState('myPeppars', peppars)
            props.ModifyState('myRelations', relations)
            props.ModifyState('mePeppar', filterService.get_me(peppars))
            props.history.push('/')
            console.log("testing filters", filterService.get_my_entity_relations(peppars, relations))
        }
        fetchData()
    },
    []);

    return (
        <div>
            Loading...
        </div>
    )
}

export default withRouter(Loader);
