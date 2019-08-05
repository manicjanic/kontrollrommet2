import React, { Component } from 'react';
import {filterService} from '../_services/filter-service'

import MeetingList from './MeetingList';

class Meetings extends Component {
  
    constructor(props){
        super(props);
        // Set Local State
        // Bind functions so they can access this
        this.findMyMeetings = this.findMyMeetings.bind(this);
    }

    findMyMeetings() {
        console.log("found these relations in Meetings:", filterService.findRelationType(this.props.my_Relations, 'PER-PLA'))
        console.log("all_peppars:", this.props.all_Peppars)
        let my_planrelations = filterService.findRelationType(this.props.my_Relations, 'PER-PLA')
        return filterService.findPepparsFromRelation(my_planrelations, this.props.all_Peppars, "B")
    }
    
    render() {
        return (
            <div>
                <MeetingList 
                    my_Meetings={this.findMyMeetings()}
                />
            </div>
        )
    }
}
   
export default Meetings;
