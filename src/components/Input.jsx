import React from 'react'
import attach from '../images/attach.png'

const Input = () => {
  return (
    <div className='input'>
      <input type='text' placeholder='Type something...' />
      <div className='send'>
        <input type='file' id="send-file"  style={{display:'none'}}/>
        <label htmlFor='send-file'>
          <img src={attach} alt='' />
        </label>
        <button>Send</button>
      </div>
    </div>
  )
}

export default Input