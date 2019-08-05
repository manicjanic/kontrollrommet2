import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const Peppar = props => (  
    <tr>
        <td>{props.peppar.name}</td>
        <td>{props.peppar.email}</td>
    </tr>
)

export default class PepparList extends Component {

    constructor(props) {
        super(props);
        // Bind functions to be used in component
        this.PepparLister = this.PepparLister.bind(this);
    }
    
    PepparLister() {
        return this.props.peppars.map(function(currentPeppar, i){
            return <Peppar peppar={currentPeppar} key={i} />;
        })
    }

    render() {
        return (
            <div className="container">
            </div>
        )
    }
}