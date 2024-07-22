import React from 'react'
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from './Messages';
import Input from './Input';
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

export default function Chat() {

  const { data } = useContext(ChatContext);//import data from ChatContext
  //so that we can display the name to currentUser on top of messaging console.

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} />
          <img src={Add} />
          <img src={More} />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}
