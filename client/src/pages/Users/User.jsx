import React from 'react'
import { Link } from 'react-router-dom'
import './Users.css'

const User = ({user}) => {
  return (
    <Link to={`/Users/${user._id}`} className='user-profile-link'>
        <h3>{user.name.charAt(0).toUpperCase()}</h3>
        <h4>{user.name}</h4>
    </Link>
  )
}

export default User