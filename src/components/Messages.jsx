import { onSnapshot, doc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'
import Message from './Message'

const Messages = () => {
  const { data } = useContext(ChatContext)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const unsub = onSnapshot(doc(db,"chats", data.chatId), (doc)=> {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unsub()
    }
  },[data.chatId])

  return (
    <div className='messages'>
      {messages.map(mess => (
        <Message message={mess} key={mess.id} />
      ))}
    </div>
  )
}

export default Messages