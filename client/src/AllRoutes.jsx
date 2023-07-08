import React from 'react'

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Questions from './pages/Questions/Questions'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import DisplayQuestion from './pages/Questions/DisplayQuestion'
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users'
import UserProfile from './pages/UserProfile/UserProfile'
import Community from './pages/Community/Community'
import ChatBot from './components/ChatBot/ChatBot'

const AllRoutes = ({ slideIn, handleSlideIn }) => {
  return (
    <Routes>
        <Route path='/' element={<Home slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
        <Route path='/Auth' element={<Auth />}/>
        <Route path='/Questions' element={<Questions slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
        <Route path='/AskQuestion' element={<AskQuestion />}/>
        <Route path='/Question/:id' element={<DisplayQuestion slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
        <Route path='/Tags' element={<Tags slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
        <Route path='/Users' element={<Users slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
        <Route path='/Users/:id' element={<UserProfile slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
        <Route path='/Community' element={<Community/>}/>
        <Route path='/GPT' element={<ChatBot/>}/>
    </Routes>
  )
}

export default AllRoutes