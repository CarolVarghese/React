
import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Counter from './components/counter'
import './App.css'
import LandingPage from './components/landingPage'


const App: React.FC = () => {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </Router>
    
  )
}

export default App
