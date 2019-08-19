import React, { useState } from 'react';

const LoginForm = (props) => {
    // Set local state
    const [form_data, setForm_data] = useState({
        username: '',
        password: ''
    })
    // Functions for handling changes in form
    const onChangeUsername = e => setForm_data({...form_data, username: e.target.value })
    const onChangePassword = e => setForm_data({...form_data, password: e.target.value })
    const onSubmit = e => {
        e.preventDefault();
        props.doLogin(form_data.username, form_data.password)
        setForm_data({username: '', password: ''})
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