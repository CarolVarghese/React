
import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Counter from './components/counter'
import './App.css'
import LandingPage from './components/landingPage'
import SignIn from './components/SignIn';
import HomePage from './components/HomePage';


const App: React.FC = () => {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/counter" element={<Counter />} />
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/homepage' element={<HomePage/>}/>
      </Routes>
    </Router>
    
  )
}

export default App
