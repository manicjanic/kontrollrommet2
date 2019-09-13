// React Modules
import React, {Component} from 'react';
// Helpers and Services
import {dataService} from '../../_services/data-service'
// Specific Components
import UserForm from "../../Components/user-form";

// New User Mode Component
export default class NewUserMode extends Component {

    // Async rutine for Login Attempt, returns responseobj
    attemptCreateUser = async (formdata) => {
        const {username, password1, email} = formdata
        // Call dataservice to process login data
        const responseobj = await dataService.postCreateUser(username, password1, email)
        console.log("response", responseobj)
    }
    
    // JSX-Element
    renderUserForm = () => <UserForm handleSubmit={this.attemptCreateUser}/>

    render() {
        return (
            <div>
                {this.renderUserForm()}   
            </div>
        )
    }
}

