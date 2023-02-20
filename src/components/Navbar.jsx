import React from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className='logo'>Fun Chat</span>
      <div className='user'>
        <img src="https://images.pexels.com/photos/14774750/pexels-photo-14774750.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
        <span>Vinh Phan</span>
        <button onClick={() => signOut(auth) }>Logout</button>
      </div>
    </div>
  )
}

export default Navbar