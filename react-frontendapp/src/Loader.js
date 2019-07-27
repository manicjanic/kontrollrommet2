import React, { useEffect } from 'react';
import {dataService} from './_services/data.service'
import { withRouter } from 'react-router'

const Loader = (props) => {

    useEffect(() => {
        const fetchData = async () => {
            const result = await dataService.getAllPeppars()
            props.ModifyState('peppars', result)
        };
        fetchData();
        props.history.push('/')
    }, []);

    return (
        <div>
            Loading...
        </div>
    )
}

export default withRouter(Loader);
