import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { context } from "../../..";
import './Login.css'

const Login = () => {
  const { store } = useContext(context);
  const [data, setData] = useState({
    login: "",
    password: ""
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      login: data.login,
      password: data.password
    };
    store.login(userData);
  };
  return (
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <input
              name="login"
              className="form-input"
              type="text"
              placeholder="Username"
              required
              value={data.login}
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-field">
            <input
              name="password"
              className="form-input"
              type="password"
              placeholder="Password"
              required
              value={data.password}
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-field">
            <input type="submit" value="Log in" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default observer(Login);
