import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/dashboard/dashboard';
import Preferences from './components/Preferences/Preferences';
import Login from './components/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <div></div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard"element={<Dashboard />} />
          
          <Route path="/preferences" element={<Preferences />} />
          
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
