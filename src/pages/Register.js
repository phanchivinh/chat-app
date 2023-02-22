import React, { useState } from 'react'
import addAvatar from '../images/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imgName, setImgName] = useState(null)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];


    try {
      //create user
      const res = await createUserWithEmailAndPassword(auth, email, password)

      //create a unique image name
      const date = new Date().getTime()
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })

            //creata user on firestore
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            })

            //create empty user chats on firestrore
            await setDoc(doc(db, "userChats", res.user.uid), {})
            navigate("/")
          } catch (err) {
            console.log(err)
            setErr(true)
            setLoading(false)
          }
        })
      })

    } catch(err) {
      setErr(true)
      setLoading(false)
    }
    
}

  const handleSelectedImg = (e) => {
    setImgName(e.target.files[0].name)
    console.log(imgName)
  }

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Fun Chat</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input required type='text' placeholder='display name' />
          <input required type='email' placeholder='email' />
          <input required type='password' placeholder='password' />
          <input required type='file' id='file' style={{ display: 'none' }} onChange={handleSelectedImg} />
          <label htmlFor='file'>
            <img src={addAvatar} alt='add avatar' />
            <span style={{ width: '100%' }}>{imgName ? `${imgName}` : "Add an avatar"}</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {/* {true && <span style={{ width: '100%' }}>Uploading and compressing the image please wait...</span>} */}
          {err && <span style={{ color: 'red' }}>Something went wrong</span>}
        </form>
        <p>You do have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Register