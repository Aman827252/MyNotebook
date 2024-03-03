import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

const Login = ({showAlert}) => {
    const [credentials,setCredentials]=useState({email: "",password: ""})
    let navigate=useNavigate();
    const handleClick=async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email,password: credentials.password})
          });
          const json = await response.json();
          if(json.success){
            localStorage.setItem('token',json.authToken)
            showAlert("Logged in Successfully","success")
            navigate("/")
          }
          else{
            showAlert("Invalid Credentials","danger")
          }
    }

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name] : e.target.value})
    }


  return (
    <div className="container my-3">
      <h1>Please Login to Continue to MyNotebook</h1>
      <div className="mb-3 mt-5">
        <label htmlFor="email" className="form-label">
          <h2>Email address</h2>
        </label>
        <input
          name="email"
          type="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          <h2>Password</h2>
        </label>
        <input
          name="password"
          type="password"
          id="password"
          className="form-control"
          aria-describedby="passwordHelpBlock"
          onChange={onChange}
        />
        <div id="passwordHelpBlock" className="form-text">
          Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </div>
      </div>
      <button onClick={handleClick} className="btn btn-primary">Submit</button>
    </div>
  );
};

export default Login;
