import React from 'react';
import logo from '../assets/nike_logo.svg';
import admin from '../assets/admin.svg';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Link to="/"><img className="logo" src={logo} alt="Nike" /></Link>

      <Link className="admin" to="/admin"><img width="20" src={admin} alt="Admin" /></Link>
    </header>
  );
};

export default Header;