import React, { Component } from 'react';
export default class ShowPacovPage extends Component {
    render() {
    const {pacov} = this.props
    console.log(pacov)
        return (
            <div>
                <h1>{pacov.added_data.name}</h1>
                <h2>{pacov.uuid}</h2>
            </div>
        )
    }
}
