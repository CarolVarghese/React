import React  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import UserContainer from './components/userContainer'
import './App.css'
import AddUser from './components/AddUser';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/users" element={<UserContainer />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App
