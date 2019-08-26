import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next'
import {Table} from 'react-bootstrap'

const MeetingsTable = (props) => {  
    
    // Static data for display
    const columns = [{
        dataField: 'text',
        text: "Møter"
        }, {
        dataField: 'date',
        text: 'Dato'
    }]

    const tabledata = props.tabledata
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
        <BootstrapTable
            bootstrap4
            hover
            classes="c"
            keyField='id'
            data={tabledata}
            tabledata={props.tabledata}
            columns={columns}
            rowEvents={rowEvents}
            selectRow={selectRow}
        />
    )   
}

export default MeetingsTable