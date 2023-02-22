import React, { useContext, useState } from 'react'
import { collection, getDocs, query, where, getDoc, setDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext'

import searchIcon from '../images/search.png'

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("displayName", '==', username))

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        // console.log(doc.data());
      });
    } catch(err) {
      setErr(true)
    }
  }

  const handleKey = e => {
    e.code === 'Enter' && handleSearch()
  }

  const handleSelect = async () => {
    //check if the group(chats in firestore) exists, if not create
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if(!res.exists()) {
        //create a user chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages:[] });

        //create user chats
            // useChats: {
            //   user1Id : {
            //     combinedId: {
            //       user2Info:{
            //         displayName, img, id
            //       },
            //       lastMessage: "",
            //       date:
            //     }
            //   }
            // }
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId+".userInfo"]: {
            uid:user.uid,
            displayName:user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId+".date"]: serverTimestamp(),
          
        })

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId+".userInfo"]: {
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId+".date"]: serverTimestamp(),

        })

      }

    } catch(err) {}

    setUser(null);
    setUsername("");
  }

  return (
    <div className='search'>
        <div className='searchForm'>
            <input type='text' placeholder='Find a user' value={username} onKeyDown={handleKey} onChange={e=>{setUsername(e.target.value)}}/>
            <div className='searchBtn' onClick={handleSearch}>
              <img src={searchIcon} alt='' />
            </div>
        </div>
        {err && <span style={{color:'#fff', paddingLeft: '10px'}}>User not found</span>}
        {user && (<div className='userChat' onClick={handleSelect}>
            <img src={user.photoURL} alt="" />
            <div className='userChatInfo'>
                <span>{user.displayName}</span>
            </div>
        </div>)}
    </div>
  )
}

export default Search