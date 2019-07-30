import React, { useEffect } from 'react';
import {dataService} from '../_services/data.service'
import {filterService} from '../_services/filter.service'
import { withRouter } from 'react-router'

const Loader = (props) => {
    // Upon mounting do this:
    
    useEffect(() => {
        const fetchData = async () => {
            let [peppars, relations] = await Promise.all([dataService.getPeppars(), dataService.getRelations()]);
            props.ModifyState('myPeppars', peppars)
            props.ModifyState('myRelations', relations)
            props.ModifyState('mePeppar', filterService.get_me(peppars))
            props.ModifyState('myEntityRelations', filterService.get_my_entity_relations(peppars, relations))
            props.history.push('/')
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
