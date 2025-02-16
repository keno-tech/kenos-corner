import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BurningRope from './pages/BurningRope';
import CompoundInterest from './pages/CompoundInterest';
import './styles/App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="app">
        <Navbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className={`content ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/burning-rope" element={<BurningRope />} />
            <Route path="/compound-interest" element={<CompoundInterest />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 