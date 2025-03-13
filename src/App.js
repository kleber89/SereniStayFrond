import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import SpaSearch from './components/SpaSearch';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/spa-search" element={<SpaSearch />} />
          <Route path="/" element={<SpaSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 