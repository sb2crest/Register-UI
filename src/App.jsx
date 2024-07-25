import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
// import Login from './components/Login';
import TermsAndConditions from './components/TermsAndConditions';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} /> Add this route
      </Routes>
    </Router>
  );
}

export default App;
