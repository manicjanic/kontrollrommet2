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