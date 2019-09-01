import React, { Component } from 'react';

export default class CreatePacovPage extends Component {
    state = {
        pacov: {
            peppar_type: undefined,
            peppar_name: "",
            peppar_uuid: "",
            started: undefined,
            specific_data: undefined
        }
    }
    render() {
        const {pacov} = this.state
        return (
            <div className="pacov-form">
                <h1>PACOV-form</h1>
            </div>
        )
    }
}


