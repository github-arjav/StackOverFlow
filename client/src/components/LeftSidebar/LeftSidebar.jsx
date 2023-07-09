import React from 'react'
import './LeftSidebar.css'
import { NavLink, Link } from 'react-router-dom'
import Globe from '../../assests/Globe.svg'

const LeftSidebar = () => {
  return (
    <div className='left-sidebar'>
      <nav className='side-nav'>
        <NavLink to='/' className='side-nav-links' activeclassname='active'>
          <p>Home</p>
        </NavLink>
        <div className="side-nav-div">
          <div><p>PUBLIC</p></div>
          <NavLink to='/Questions' className='side-nav-links' activeclassname='active' >
            <img src={Globe} alt="Globe" />
            <p style={{paddingLeft:'10px'}}>Questions</p>
          </NavLink>
          <NavLink to='/Tags' className='side-nav-links' style={{paddingLeft: '40px'}}>
            <p>Tags</p>
          </NavLink>
          <NavLink to='/Users' className='side-nav-links' style={{paddingLeft: '40px'}}>
            <p>Users</p>
          </NavLink>
          <Link to='/Community' className='side-nav-links community-1'>Community</Link>
          <Link to='/GPT' className='side-nav-links gpt-1'>ProgrammingGPT</Link>
        </div>
      </nav>
    </div>
  )
}

export default LeftSidebar