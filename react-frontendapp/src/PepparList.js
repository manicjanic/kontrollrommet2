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
        console.log("props-peppars:", this.props.peppars)
        return this.props.peppars.map(function(currentPeppar, i){
            console.log("current peppar", currentPeppar)
            return <Peppar peppar={currentPeppar} key={i} />;
        })
    }

    render() {
        return (
            <div className="container">
                <h3>Peppar List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.PepparLister() }
                    </tbody>
                </table>
            </div>
        )
    }
}