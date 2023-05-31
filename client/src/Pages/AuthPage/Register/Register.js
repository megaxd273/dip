import React, { useState } from "react";
import $axi from "../../../http/index";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [modal, setModal] = useState(null);
    const navigate = useNavigate();
    const [data, setData] = useState({
        firstName:"",
        lastName:"",
        middleName:"",
        login:"",
        password:"",
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
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            middleName: data.middleName
        };
        $axi.post("/api/registration", userData)
        .then(response=>{
            console.log(response.data);
            localStorage.setItem('accessToken',response.data.accessToken);
            localStorage.getItem('accessToken');
            navigate('/Dashboard');

        })
        .catch(error => {
            if (error.response && error.response.status === 408) {
                alert(error.response.data.message);
            } else {
                console.log(error);
            }
        });
    }
    return (
        <form className="action-form" onSubmit={handleSubmit}>
            <div className="form-field">
                <input name="firstName" className="form-input" type="text" placeholder="Name" required
                value={data.firstName}
                onChange={handleChange}></input>
            </div>
            <div className="form-field">
                <input name="lastName" className="form-input" type="text" placeholder="Surname" required
                value={data.lastName}
                onChange={handleChange}></input>
            </div>
            <div className="form-field">
                <input name="middleName" className="form-input" type="text" placeholder="Patronymic" required
                value={data.middleName}
                onChange={handleChange}></input>
            </div>
            <div className="form-field">
                <input name="login" className="form-input" type="text" placeholder="Login" required
                value={data.login}
                onChange={handleChange}></input>
            </div>
            <div className="form-field">
                <input name="password" className="form-input" type="text" placeholder="Password" required
                value={data.password}
                onChange={handleChange}></input>
            </div>
            <div className="form-field">
                <input type="submit" value="Register" />
            </div>
        </form>
    )
}

export default Register;