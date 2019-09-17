// React Modules
import React from 'react';
// React Bootstrap Table Module
import {BootstrapTable as Table} from '../_components/Table'
// Helpers and Services
import { filterService } from "../_services/filter-service";
import {PACOV_ID, RELATION_ID} from '../Hardcoded/lookup-table'
// Static data for display
const COLUMNS = [{
    dataField: 'text',
    text: "Møter"
    },{
    dataField: 'date',
    text: 'Dato'
}]

// Meetings Table Specific Component
const MeetingsTable = (props) => {  
    // Gather Props
    const {meetings} = props
    
    // Define Table Object
    const tableobj = {
        columns: COLUMNS,
        rows: makeTableRows()
    }

    //Make display data from Enhanced Meeting Pacovs
   function makeTableRows() {
        let tablerows = []
        for (let key in meetings) {
            let meeting = meetings[key]
            // Find date
            let date = meeting.specific_data.suggested_meeting_date? new Date(meeting.specific_data.suggested_meeting_date).toLocaleDateString() : "no date specified"
            // Find meeting type
            let type = meeting.specific_data.meeting_type_name? meeting.specific_data.meeting_type_name : "A Meeting"
            // Find entity
            let entity = filterService.filterRelationsByType(meeting.relations, RELATION_ID.EXECUTIVE_ENTITY, true)
            let entity_name = entity? " i " + entity.pacovB.name : ""
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
            console.log("clicked on row", row)
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