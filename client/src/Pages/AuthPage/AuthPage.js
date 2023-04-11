import React, { useState } from "react";
import './css/AuthStyle.css'
import Login from "./Login/Login";
import Register from "./Register/Register";

const AuthPage = ()=>{
    const [formType,setFormType] = useState('login')
    const handleFormChange=(formName)=>{
        setFormType(formName);
    }
    return(
        <div className="container">
            {/* <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
            </Routes> */}
            <div className="static-img">
                <strong>Diploma Project</strong>
            </div>
            <div className="container-form">
                <div className="option-picker">
                    <button onClick={()=>handleFormChange('login')}>SignIn</button>
                    <button onClick={()=>handleFormChange('register')}>Register</button>
                </div>
                {formType === 'login' ? <Login/>:<Register/>}
            </div>
        </div>
    )
}

export default AuthPage;