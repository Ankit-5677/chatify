import { onSnapshot, doc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

export default function Chats() {

  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
  
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();//call this function only when current user has registered.
  }, [currentUser.uid]);

  const handleSelect = (u) =>{
    dispatch({type:"CHANGE_USER", payload: u});
  }//by clicking on any user we make it user and send this to chatcontext that establishes
  //chatID and store user.
  //Reducer is used when we have to send data to context api.

  return (
    <div className="chats">
        {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat) => (
          <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} alt=''/>
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
        ))}
    </div>
  )
}
