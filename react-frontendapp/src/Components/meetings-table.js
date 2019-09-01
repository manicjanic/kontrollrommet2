import React from 'react';
import {BootstrapTable as Table} from '../_components/Table'

const MeetingsTable = (props) => {  
    
    // Static data for display
    const columns = [{
        dataField: 'text',
        text: "Møter"
        }, {
        dataField: 'date',
        text: 'Dato'
    }]

    // Set up     
    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            console.log(`clicked on row with index:`, row.id)
            props.changeMeetingSelection(row.id)
        }
    }
    
    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        style: { backgroundColor: '#c8e6c9' },
        hideSelectColumn: true,
    }
    
    return (
        <Table
            bootstrap4
            hover
            classes="c"
            keyField='id'
            data={props.tabledata}
            columns={columns}
            rowEvents={rowEvents}
            selectRow={selectRow}
        />
    )   
}

export default MeetingsTable