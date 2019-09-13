import React from 'react';
import {BootstrapTable as Table} from '../_components/Table'

// Static data for display
const COLUMNS = [{
    dataField: 'text',
    text: "Møter"
    },{
    dataField: 'date',
    text: 'Dato'
}]


const MeetingsTable = (props) => {  
    // Gather Props
    const {meetings} = props
    // Make Table Object
    const tableobj = {
        columns: COLUMNS,
        rows: makeTableRows()
    }

    //Make derived data from props
   function makeTableRows() {
        let tablerows = []
        for (let key in meetings) {
            let meeting = meetings[key]
            // Find date
            let date = meeting.specific_data.suggested_meetingdate? new Date(meeting.specific_data.suggested_meetingdate).toLocaleDateString() : "no date specified"
            // Find meeting type
            let type = meeting.specific_data.meeting_type_name? meeting.specific_data.meeting_type_name : "A Meeting"
            // Find entity
            let entity_name = meeting.executive_entity? " i " + meeting.executive_entity.name : ""             
            let text = type + entity_name
            if (meeting.status === "DRAFT") {text += " (Draft)"}
            // Make row object
            let rowobj = {
                id: meeting.uuid,
                text: text,
                date: date
            }
            // Add to tablerows
            tablerows.push(rowobj)   
        }
        return tablerows
    }
    
    // Set up     
    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            console.log(`clicked on row with index:`, row)
            props.changeMeetingSelection(row)
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
            data={tableobj.rows}
            columns={tableobj.columns}
            rowEvents={rowEvents}
            selectRow={selectRow}
        />
    )   
}

export default MeetingsTable