import React, { useContext, useState } from 'react'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { db, storage } from '../firebase'
import { v4 as uuid } from 'uuid'

import Img from '../images/img.png'

const Input = () => {
  const [img, setImg] = useState(null)
  const [text, setText] = useState("")

  const {currentUser} = useContext(AuthContext)
  const { data } = useContext(ChatContext)


  const handleSend = async() => {

    if(img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          // setErr(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL
              })
            })
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      })
    }

    

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId+".lastMessage"]: {
        text,
      },
      [data.chatId+".date"]: serverTimestamp(),
    })

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId+".lastMessage"]: {
        text,
      },
      [data.chatId+".date"]: serverTimestamp(),
    })

    setImg(null)
    setText("")
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSend()
  }

  return (
    <div className='input'>
      {img && <span className='inputImg'>{img.name}</span>}
      <input 
        type='text' 
        placeholder='Type something...' 
        value={text} 
        onChange={(e)=>setText(e.target.value)}
        onKeyDown={handleKey}
      />
      <div className='send'>
        <input 
          type='file' 
          id="send-file"  
          style={{display:'none'}} 
          onChange={(e) => setImg(e.target.files[0])} 
          onKeyDown={handleKey}
        />
        <label htmlFor='send-file'>
          <img src={Img} alt='' />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input