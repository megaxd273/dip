import React, { useState } from "react";
import axios from 'axios';

const Register = () => {
    const [data, setData] = useState({
        name:"",
        surname:"",
        email:"",
        day:"",
        month:"",
        year:""
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
            name: data.name,
            surname: data.surname,
            email: data.email,
            birthDate: `${data.day}-${data.month}-${data.year}`
        };
        axios.post("https://jsonplaceholder.typicode.com/users", userData)
        .then(response=>{
            console.log(response.data);
        });
    }
    return (
        <form className="action-form" onSubmit={handleSubmit}>
            <div className="form-field">
                <input name="name" className="form-input" type="text" placeholder="Name" required
                value={data.name}
                onChange={handleChange}></input>
            </div>
            <div className="form-field">
                <input name="surname" className="form-input" type="text" placeholder="Surname" required
                value={data.surname}
                onChange={handleChange}></input>
            </div>
            <div className="form-field">
                <input name="email" className="form-input" type="text" placeholder="Email" required
                value={data.email}
                onChange={handleChange}></input>
            </div>
            <div className='age-block'>
                <div className="field-inline-block">
                    <input name="day" type="text" pattern="[0-9]*" maxLength="2" size="2" className="date-field" placeholder='DD' 
                    value={data.day}
                    onChange={handleChange}/>
                </div>
                /
                <div className="field-inline-block">
                    <input name="month" type="text" pattern="[0-9]*" maxLength="2" size="2" className="date-field" placeholder="MM" 
                    value={data.month}
                    onChange={handleChange}/>
                </div>
                /
                <div className="field-inline-block">
                    <input name="year" type="text" pattern="[0-9]*" maxLength="4" size="4" className="date-field date-field--year" placeholder="yyyy" 
                    value={data.year}
                    onChange={handleChange}/>
                </div>
            </div>
            <div className="form-field">
                <input type="submit" value="Log in" />
            </div>
        </form>
    )
}
export default Register;