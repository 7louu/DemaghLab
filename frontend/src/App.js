import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Courses from './pages/Courses';
import Course from './pages/Course';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='*' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/courses' element={<Courses/>} />
          <Route path='/course/:id' element={<Course/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App