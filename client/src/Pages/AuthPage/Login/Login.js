import React, { useState } from "react";
import axios from 'axios';

const Login = () => {
    const [data,setData] = useState({
        email:"",
        password:""
    });
    const handleChange = (e)=>{
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]:value
        });
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const userData = {

            email: data.email,
            password:data.password
        }
        axios.post("https://jsonplaceholder.typicode.com/users", userData)
        .then(response=>{
            console.log(response.data);
        });
    }
    return (
        <form className="action-form" onSubmit={handleSubmit}>
            <div className="form-field">
                <input name="email" className="form-input" type="text" placeholder="Username" required
                value={data.email}
                onChange={handleChange}></input>
            </div>
            <div className="form-field">
                <input name="password" className="form-input" type="password" placeholder="Password" required
                value={data.password}
                onChange={handleChange}></input>
            </div>
            <div className="form-field">
                <input type="submit" value="Log in" />
            </div>
        </form>
    )
}
export default Login;