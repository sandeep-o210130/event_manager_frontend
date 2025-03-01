import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Navabar from './pages/navbar'
import Home from './pages/home'
import EventDetail from './pages/eventDetail'
import Register from './pages/register'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import CreateEvent from './pages/createEvent' 
import "bootstrap/dist/css/bootstrap.min.css";
import Edit from './pages/edit'

function App() {

  return (
    <>
    <Router>
      <Navabar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/event/:id' element={<EventDetail />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/createEvent' element={<CreateEvent />}/>
        <Route path='/edit/:id' element={<Edit />}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
