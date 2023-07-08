import React from 'react'
import './LeftSidebar.css'
import { NavLink, Link } from 'react-router-dom'
import Globe from '../../assests/Globe.svg'
import Navbar from '../Navbar/Navbar'

const LeftSidebar = ({slideIn, handleSlideIn}) => {
  const slideInStyle = {
    transform: "translateX(0%)",
  };

  const slideOutStyle = {
    transform: "translateX(-100%)",
  };
  return (
    <div className='left-sidebar'
    style={slideIn ? slideInStyle : slideOutStyle}
    >
      <nav className='side-nav'>
        <NavLink onClick={() => handleSlideIn()} to='/' className='side-nav-links' activeclassname='active'>
          <p>Home</p>
        </NavLink>
        <div className="side-nav-div">
          <div><p>PUBLIC</p></div>
          <NavLink onClick={() => handleSlideIn()} to='/Questions' className='side-nav-links' activeclassname='active' >
            <img src={Globe} alt="Globe" />
            <p style={{paddingLeft:'10px'}}>Questions</p>
          </NavLink>
          <NavLink onClick={() => handleSlideIn()} to='/Tags' className='side-nav-links' style={{paddingLeft: '40px'}}>
            <p>Tags</p>
          </NavLink>
          <NavLink onClick={() => handleSlideIn()} to='/Users' className='side-nav-links' style={{paddingLeft: '40px'}}>
            <p>Users</p>
          </NavLink>
          <Link onClick={() => handleSlideIn()} to='/Community' className='side-nav-links community-1'>Community</Link>
          <Link onClick={() => handleSlideIn()} to='/GPT' className='side-nav-links gpt-1'>ProgrammingGPT</Link>
        </div>
      </nav>
    </div>
  )
}

export default LeftSidebar