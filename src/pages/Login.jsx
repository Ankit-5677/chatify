import React, { useState } from 'react'
import '../App.css';
import Add from "../img/addAvatar.png";
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


export default function Login() {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err){
      setErr(true);
    }

  };

  return (
    <>
        <div className="formContainer">
            <div className="formWrapperlogin">
                <span className="logo">Chatify</span>
                <span className="title">Login</span>
                <form id="myform" onSubmit={handleSubmit}>
                    <input type="email" placeholder="email" className="inputfield"/>
                    <input type="password" placeholder="password" className="inputfield"/>
                    <button className="mybtn">Sign in</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>You don't have an account? <Link to="/register" className="login">Register</Link> </p>
            </div>
        </div>
    </>
  )
}