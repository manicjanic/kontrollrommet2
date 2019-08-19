import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PacovsList extends Component {
    renderNotes() {
        const pacovs = Object.values(this.props.pacovs);
        return pacovs.map((item, i) => <div key={i}><Link to={`/pacovs/${item._id}`}><h2>{item.peppar_name}</h2></Link></div> )
    }
    
    render() {
        return (
            <div>
                {this.renderNotes()}
            </div>
        )
    }
}
