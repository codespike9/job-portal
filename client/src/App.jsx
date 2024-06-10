import React from 'react'
import HomePage from './views/homepage/HomePage'
import AllJobPage from './views/jobpage/AllJobPage'
import RegisterPage from './views/authenticationpage/RegisterPage'
import LoginPage from './views/authenticationpage/LoginPage'

import {BrowserRouter as Router,Route ,Routes} from "react-router-dom"
import { AuthProvider } from './contexts/AuthConetxt'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/jobs' element={<AllJobPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App