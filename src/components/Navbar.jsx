import React, { useContext } from 'react'
import "../App.css";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {

  const {currentUser} = useContext(AuthContext);

  return (
    <div className="navbar">
        <span className="logx">Chatify</span>
        <div className="user">
            <img src={currentUser.photoURL}/>
            <span>{currentUser.displayName}</span>
            <button onClick={()=>signOut(auth)} className='btn'>logout</button>
        </div>
    </div>
  )
}
