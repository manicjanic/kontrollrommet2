import React, { useEffect } from 'react';
import {dataService} from './_services/data.service'
import { withRouter } from 'react-router'

const Loader = (props) => {
    // Upon mounting do this:
    useEffect(() => {
        const fetchData = async () => {
            const userdata = await dataService.getUserData()
            const myrelations = await dataService.getMyRelations()
            const myclosecircle = await dataService.getCloseCircle()
            const mycloserelations = await dataService.getCloseRelations()           
            props.ModifyState('userdata', userdata)
            props.ModifyState('myRelations', myrelations)
            props.ModifyState('myCloseCircle', myclosecircle)
            props.ModifyState('myCloseRelations', mycloserelations)

        };
        fetchData();
        
        props.history.push('/')
    },
    []);

    return (
        <div>
            Loading...
        </div>
    )
}

export default withRouter(Loader);
