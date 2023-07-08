import React from 'react'
import './UserWidget.css'

import user from '../../assests/user-solid.svg'
import occupation from '../../assests/briefcase-solid.svg'
import bio from '../../assests/address-card-solid.svg'


const UserWidget = () => {
  return (
    <div className="main-container">
        <div className='user-widget-container'>
        <div className="user-name">
            <img src={user} alt="user" width="18"/>    
            <h2>Arjav Jain</h2>
        </div>
        <div className='friends'>
            <p>0 freinds</p>
        </div>
        <hr />
        <div className="user-occupation">
            <img src={occupation} alt="occupation" width="18"/>
            <h4>Student</h4>
        </div>
        <div className="user-bio">    
            <img src={bio} alt='bio' width="18"/>
            <h4>Full Stack Developer</h4>
        </div>
    </div>
    </div>
  )
}

export default UserWidget