import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

const Signup = ({showAlert}) => {

  const [credentials,setCredentials]=useState({name:"",email: "",password: "",cpassowrd: ""})
    let navigate=useNavigate();
    const handleClick=async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name:credentials.name,email: credentials.email,password: credentials.password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            localStorage.setItem('token',json.authToken)
            navigate("/")
            showAlert("Account Created Successfully","success")
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
      <h1>Create An Account to Use MyNotebook</h1>
      <div className="mb-3 mt-5">
        <label htmlFor="name" className="form-label">
          <h2>Name</h2>
        </label>
        <input
          name="name"
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter Name Here"
          onChange={onChange}
        />
      </div>

      <div className="mb-3">
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
          placeholder="Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji."
        />
      </div>

      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">
          <h2>Confirm Password</h2>
        </label>
        <input
          name="password"
          type="password"
          id="cpassword"
          className="form-control"
          aria-describedby="passwordHelpBlock"
          onChange={onChange}
          placeholder="Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji."
        />
      </div>

      <button onClick={handleClick} className="btn btn-primary">Submit</button>

    </div>
  )
}

export default Signup