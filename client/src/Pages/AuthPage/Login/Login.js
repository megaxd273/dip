import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import $axi from "../../../http/axi";

const Login = () => {
    const navigate = useNavigate()
    const [data,setData] = useState({
        login:"",
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
            login: data.login,
            password: data.password
        }
        $axi.post("/api/login", userData)
        .then(response=>{
            console.log(response);
            localStorage.setItem('accessToken',response.data.accessToken);
            navigate('/Dashboard')
        });
    }
    return (
        <form className="action-form" onSubmit={handleSubmit}>
            <div className="form-field">
                <input name="login" className="form-input" type="text" placeholder="Username" required
                value={data.login}
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