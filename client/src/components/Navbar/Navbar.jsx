import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import decode from 'jwt-decode'

import logo from '../../assests/logo.png'
import search from '../../assests/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar'
import './Navbar.css'
import { setCurrentUser } from '../../actions/currentUser'

const Navbar = () => {

    const dispatch = useDispatch()
    var User = useSelector((state) => (state.currentUserReducer))

    useEffect(() => {
        const token = User?.token
        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp *1000 < new Date().getTime()){
                handleLogout()
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    },[dispatch])

    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch({ type:'LOGOUT'})
        navigate('/')
        dispatch(setCurrentUser(null))
    }

  return (
    <nav className='main-nav'>
        <div className='navbar'>
            <Link to='/' className='nav-item nav-logo'>
                <img src={logo} alt='logo'/>
            </Link>
                <Link to='/' className='nav-item nav-btn'>About</Link>
                <Link to='/' className='nav-item nav-btn'>Products</Link>
                <Link to='/' className='nav-item nav-btn'>For Teams</Link>
                <Link to='/Community' className='nav-item nav-btn community'>Community</Link>
                <Link to='/GPT' className='nav-item nav-btn gpt'>ProgrammingGPT</Link>
                <form>
                    <input type="text" placeholder='Search...' />
                    <img src={search} alt="search" width="18" className='search-icon'/>
                </form>
                { User === null ?
                    <Link to='/Auth' className='nav-item nav-links'>Log In</Link> :
                    <>
                        <Avatar backgroundColor='#009dff' px="10px" py="7px" borderRadius="50%" color="white"><Link to={`/Users/${User?.result._id}`} style={{textDecoration: 'none'}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                        <button className='nav-item nav-links' onClick={handleLogout}>Log Out</button>
                    </>
                }
        </div>
    </nav>
  )
}

export default Navbar
