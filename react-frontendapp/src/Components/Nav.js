import React, { Component } from 'react';

import NavBar from './NavBar';

class Nav extends Component {
  
    constructor(props){
        super(props);
        this.state = {
            menudata: [ 
                {text: "Dashboard", status: "disabled", path: "/dashboard" },
                {text: "Meetings", status: "disabled", path: "/meetings"},
                {text: "Login", status: "enabled", path: "/login"},
                {text: "Logout", status: "hidden", path: "/logout"},   
            ]
        }
    }

     // If prop changes, rundt this
     componentWillReceiveProps() {
        if (this.props.isLoggedin) {
            this.setState(prevState => {
                var list = prevState.menudata;
                list[0].status = "enabled" 
                list[1].status = "enabled"                 
                list[2].status = "hidden" 
                list[3].status = "enabled"
                return list
            })
        }
    }
    
    render() {
        return (
            <NavBar 
                isLoggedin={this.props.isLoggedin}
                menudata={this.state.menudata}
                myEntityRelations={this.props.myEntityRelations}
                mePeppar={this.props.mePeppar}
                />
        )
    }
}
   
export default Nav;
