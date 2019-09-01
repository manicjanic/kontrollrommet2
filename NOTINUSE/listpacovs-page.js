import React, { Component } from 'react';

import PacovsList from '../Components/pacovs-list'

export default class ListPacovsPage extends Component {
    
    render() {
        return (
            <div>
                <h1>PACOVs</h1>
                <PacovsList pacovs={this.props.pacovs}/>
            </div>
        )
    }
}
