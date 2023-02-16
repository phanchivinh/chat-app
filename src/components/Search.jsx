import React from 'react'

const Search = () => {
  return (
    <div className='search'>
        <div className='searchForm'>
            <input type='text' placeholder='Find a user'/>
        </div>
        <div className='userChat'>
            <img src='https://images.pexels.com/photos/14774750/pexels-photo-14774750.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt="" />
            <div className='userChatInfo'>
                <span>Somebody</span>
            </div>
        </div>
    </div>
  )
}

export default Search