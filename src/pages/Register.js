import React from 'react'
import addAvatar from '../images/addAvatar.png'

const Register = () => {
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Fun Chat</span>
        <span className='title'>Register</span>
        <form>
          <input type='text' placeholder='display name'/>
          <input type='email' placeholder='email'/>
          <input type='password' placeholder='password'/>
          <input type='file' id='file' style={{ display:'none' }}/>
          <label htmlFor='file'>
            <img src={addAvatar} alt='add avatar' />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
  )
}

export default Register