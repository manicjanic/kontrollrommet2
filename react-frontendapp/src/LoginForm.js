import React, { useState } from 'react';

const LoginForm = (props) => {
    // Set state
    const [state, setState] = useState({ username: '', password: ''})
    // Functions for handling changes
    const onChangeUsername = e => setState({...state, username: e.target.value })
    const onChangePassword = e => setState({...state, password: e.target.value })
    const onSubmit = e => {
        e.preventDefault();
        props.doLogin(state.username, state.password)
        setState({username: '', password: ''})
    }
    
    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <div className="form-group"> 
                    <label>Username: </label>
                    <input  
                        type="text"
                        className="form-control"
                        onChange={onChangeUsername}
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input 
                        type="password" 
                        className="form-control"
                        onChange={onChangePassword}
                    />
                </div>
                <br />
                <div className="form-group">
                    <input type="submit" value="Enter" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
  
}

export default LoginForm