import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardInfo from './DashboardInfo';
import '../styles/Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div className={`hamburger-lines ${isOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-brand">
          <Link to="/">Keno's Corner</Link>
        </div>
        <DashboardInfo />
        <div className="sidebar-links">
          <Link to="/">Home</Link>
          <Link to="/burning-rope">Burning Rope</Link>
          <Link to="/compound-interest">Compound Interest</Link>
        </div>
      </div>
    </>
  );
}

export default Navbar; 