import React, { useContext, useState } from 'react';
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { v4 as uuid} from "uuid";
import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../firebase';

export default function Input() {

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const handleSend = async () => {
    if(img){

      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              })
            })
          })
        }
      )
    }else{
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      })
    }//update message array in firebase, it will store all the messages in database under combined user id and currentuser id.

    await updateDoc(doc(db, "userChats", currentUser.uid),{
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid),{
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });//update userchats because we need to show last message in search list and to sort them according to time we used timestamp.

    setText("");
    setImg(null);
  };
  return (
    <div className="Input">
        <input type="text" placeholder="Type something..." onChange={e=>setText(e.target.value)} value={""}/>
        <div className="send">
            <img src={Attach} alt="" />
            <input type="file" style={{display: "none"}} id="file" onChange={e=>setImg(e.target.files[0])} />
            <label htmlFor="file">
                <img src={Img} alt='' />
            </label>
            <button onClick={handleSend}>Send</button>
        </div>
    </div>
  )
}
