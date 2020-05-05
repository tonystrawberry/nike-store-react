import React from 'react';
import logo from '../assets/nike_logo.svg';
import './Header.css';

const Header = () => {
  return (
    <header>
      <a href="/"><img className="logo" src={logo} alt="Nike" /></a>
    </header>
  );
};

export default Header;