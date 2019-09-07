        if(response.request.status === 200){
            console.log("Login successfull", response.data.token );
            localStorage.setItem('token', response.data.token);
            this.props.LoggedIn();
        }
        else if(response.request.status === 204){
            console.log("Username password do not match");
            alert("username password do not match")
        }
        else{
            console.log("Username does not exists");
            alert("Username does not exist");
        }
    })

        {htmlAdder("nav-link", "disabled", !props.isLoggedin)}
        this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />;

    // adds an element (_addon) to an existing html element (_classname), if given the truth (_truth)
function htmlAdder(_text, _addon, _truth) {
        let text = _text;
        if (_truth) {
            text += (" " + _addon)
        }
        return text
    }
    // toggles between two elements (_truetext, _falsetext) based on the truth (_truth)
function htmlSwitcher(_truetext, _falsetext, _truth) {
        var text
        if (_truth) {
            text= _truetext
        }
        else text = _falsetext
        return text
    }


    // Html render for each menu item
    function MenuItem(item) {
        var {status, path, text} = item.item
        if (status == "hidden") {
            return null
        }
        else {
        var classname = "nav-link"+" " + status
        }
        return (
        <li className="nav-item">
            <NavLink className={classname} to={path}>{text} </NavLink>
        </li>
        )
    }
    
    // Html render for menu
    function MenuMaker() {
        return (
            Menu.map(function(_menuitem, i) {
                return <MenuItem item={_menuitem} key={i} />;
            })
        )
    } 
    
    function Modifier(props) {
        if (props.isLoggedin) {
            setMenu
        }

    }

    .then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                // Don't know how this one works yet
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });


    componentDidMount() {
        dataService.getAllPeppars()
        .then(data => { 
            this.props.ModifyState("peppars", data)
        })
    }


    .then(data => {
        // login successful if there's a user in the response
        if (data.token) {
            // store user details and basic auth credentials in local storage 
            // to keep user logged in between page refreshes
            data.authdata = window.btoa(username + ':' + password);
            localStorage.setItem('user', JSON.stringify(data));
        }
        return data;
    });




        const fetchData = async () => {
            const peppars = await dataService.getPeppars()
            return peppars
 //           const myrelations = relations.filter(relation => {
 //               return relation
 //           })

//            })
//            const userdata = await dataService.getUserData()
//            const myrelations = await dataService.getMyRelations()
//            const myclosecircle = await dataService.getCloseCircle()
//            const mycloserelations = await dataService.getCloseRelations()           
//            props.ModifyState('userdata', userdata)
//            props.ModifyState('myRelations', myrelations)
//            props.ModifyState('myCloseCircle', myclosecircle)
//            props.ModifyState('myCloseRelations', mycloserelations)


&& obj.pepparA.uuid === get_me(peppars).uuid


    // Set local state
    const [menu, setMenu] = useState(
        [
            {id:1, text: "Dashboard", status: "disabled", path: "/dashboard" },
            {id:2, text: "Meetings", status: "disabled", path: "/meetings"},
            {id:3, text: "Login", status: "enabled", path: "/login"},
            {id:4, text: "Logout", status: "hidden", path: "/logout"},   
        ]
    )
        
    const Menu = (props) => {
        
        if (props.checkLoginStatus) {
            menu[0].disabled=false
            menu[1].disabled=false
            menu[2].disabled=true
            menu[2].hidden=true
            menu[3].disabled=false
            menu[3].hidden=false
        }
    
        return menu.map(function(_item, i){
            let _classname = "nav-link"
            if (_item.disabled) {_classname += " disabled"} 
            if (_item.hidden) {_classname += " d-none"}
            return <MenuItem item={_item} cn={_classname} key={i} />;              
        })
    }
    
    const MenuItem = (props) => {
        return (
            <li className="nav-item">
                <NavLink className={props.cn} to={props.menudata[0].path}>{props.menudata[0].text}</NavLink>
            </li>
        )    
    }

        async componentDidMount() {
        const pacovs = await this.state.db.getAllPacovs();
        this.setState({
            pacovs,
            loading: false
        });
    }




    const [
        pacovs_list, 
        relations_list,
        pacovtypes_list, 
        relationtypes_list,
        pacovsubtypes_list,
        relationsubtypes_list, 
    ] = await Promise.all([
        dataService.getCategory(),
        dataService.getRelationType(),
        dataService.getPacovSubTypes(),
        dataService.getRelationSubTypes(),
        dataService.getPacovs(), 
        dataService.getRelations(),
    ]);


    // Construct a list of front end specific UserRelation objects
const produceUserMeetings = (relations, pacovs) => {    
    console.log("running produceUserMeetings with this data:", relations, pacovs)
    // Filter for pacovs of type Meeting
    let meetings = filterService.filterPacovsByCategory(pacovs, PACOV_ID.MEETING)    
    for (let key in meetings) {
        // Start with the base PACOV, we will add specific new fields to this
        let meeting = meetings[key]
        // Find different Relations to Meeting PACOV        
        let meetingrelations = filterService.findRelationsToPacov(relations, meeting)
        console.log("meetingrelations", meetingrelations)
        // Isolate Relations
        let query_obj = {
            request_relation: Object.values(filterService.filterRelationsByType(meetingrelations, RELATION_ID.EVENT_IN_QUESTION))[0],
            collectiveentity_relation: Object.values(filterService.filterRelationsByType(meetingrelations,RELATION_ID.EXECUTIVE_ENTITY))[0],
            meeting_topic_relations: filterService.filterRelationsByType(meetingrelations, RELATION_ID.MEETING_TOPIC),
            attendee_relations: filterService.filterRelationsByType(meetingrelations, RELATION_ID.PARTICIPANT),
    //      logger_relations: filterService.filterRelationsByType(meetingrelations, RELATION_ID.PARTICIPANT),
    //      runner_relations: filterService.filterRelationsByType(meetingrelations, RELATION_ID.PARTICIPANT),   
        }
        if (query_obj.request_relation) {
            query_obj.request = filterService.findPacovByUUID(pacovs, query_obj.request_relation.pacovB) 
        }
        if (query_obj.collectiveentity_relation) {
            query_obj.collectiveentity = filterService.findPacovByUUID(pacovs, query_obj.collectiveentity_relation.pacovB)
        }
        // Find different Relations to Request PACOV
        console.log("request-relation", query_obj.request_relation)       
        query_obj.request_relations = filterService.findRelationsToPacov(relations, query_obj.request)
        query_obj.invited_relations = filterService.filterRelationsByType(query_obj.request_relations, RELATION_ID.INVITEE)
        query_obj.inviter_relation = Object.values(filterService.filterRelationsByType(query_obj.request_relations, RELATION_ID.INVITER))[0]
        query_obj.request_topic_relations = filterService.filterRelationsByType(query_obj.request_relations, RELATION_ID.REQUEST_TOPIC)
        // Construct Object
        // Add Participants
        meeting.participants = []
        // Add Inviter
        if (query_obj.inviter_relation) {
            query_obj.inviter = filterService.findPacovByUUID(pacovs, query_obj.inviter_relation.pacovB)
            let participant = {
                person_pacov: query_obj.inviter,
                inviter: query_obj.inviter_relation.started
            }
            meeting.participants.push(participant)
        }
        // Add Inviteds
        for (let key in query_obj.invited_relations) {
            let invited_relation = query_obj.invited_relations[key]
            let invited = filterService.findPacovByUUID(pacovs, invited_relation.pacovB)
            let participant = {
                person_pacov: invited, 
                invitee: invited_relation.started,
                responder: invited_relation.ended
            }
            meeting.participants.push(participant)
        }
        // Adding Attendees
        for (let key in query_obj.attendee_relations) {
            let attendee_relation = query_obj.attendee_relations[key]
            let attendee = filterService.findPacovByUUID(pacovs, attendee_relation.pacovB)
            // Check if and and routine for participant already in list
            let existing_participant_index = meeting.participants.findIndex(participant => participant.person_pacov.uuid = attendee.uuid )
            let existing_participant = {}
            if (existing_participant_index !== -1) {
                existing_participant = meeting.participants[existing_participant_index]
                delete existing_participant.person_pacov
                meeting.participants.splice(existing_participant_index, 1)
            }
            let participant = {
                person_pacov: attendee, 
                attender: attendee_relation.started,
                attended: attendee_relation.ended
            }
            participant = Object.assign(participant, existing_participant)
            meeting.participants.push(participant)
        }
        // Add Topics
        // Add Request Topics
        meeting.topics = []
        for (let key in query_obj.request_topic_relations) {
            let topic_relation = query_obj.request_topic_relations[key]
            let topic_pacov = filterService.findPacovByUUID(pacovs, topic_relation.pacovB)
            let topic = {
                topic_pacov: topic_pacov, 
                request_headline: topic_relation.request_topic_headline,
                request_description: topic_relation.request_topic_description,
                request_listposition: topic_relation.idcode
            }
            meeting.topics.push(topic)
        }
        // Add Meeting Topics
        for (let key in query_obj.meeting_topic_relations) {
            let topic_relation = query_obj.meeting_topic_relations[key]
            let topic_pacov = filterService.findPacovByUUID(pacovs, topic_relation.pacovB)
            // Check if and and routine for topic already in list
            let existing_topic_index = meeting.topics.findIndex(topic => topic.topic_pacov.uuid = topic_pacov.uuid )
            let existing_topic = {}
            if (existing_topic_index !== -1) {
                existing_topic = meeting.topics[existing_topic_index]
                delete existing_topic.topic_pacov
                meeting.topics.splice(existing_topic_index, 1)
            }
            let topic = {
                topic_pacov: topic_pacov, 
                ongoing_headline: topic_relation.event_topic_headline,
                ongoing_description: topic_relation.event_topic_description,
                ongoing_listposition: topic_relation.idcode
            }
            topic = Object.assign(topic, existing_topic)
            meeting.topics.push(topic)
        }
        // Adding executive entity
        meeting.executive_entity = query_obj.collectiveentity
        // Storing meeting
        meetings[key] = meeting
    }
    return meetings
}

// Construct a list of front end specific UserRelation objects
const produceUserRoles = (relations, user_pacov, pacovs) => {    
    console.log("running produceUserRoles with this data:", relations, user_pacov, pacovs)
    // Filter for relations of type Role
    let filtered_relations = filterService.filterRelationsByType(relations, RELATION_ID.ROLE)    
    // Filter for relations containing user and allign
    filtered_relations = filterService.findRelationsToPacov(filtered_relations, user_pacov)
    // Construct Userrepresentations List
    console.log("filtered relations", filtered_relations)
    let resultobj = filtered_relations
    for (let key in resultobj) {
        // Construct Object
        resultobj[key].collective_entity = filterService.findPacovByUUID(pacovs, resultobj[key].pacovB)
    }
    return resultobj
}

