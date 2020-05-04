import React, { PureComponent } from 'react';
import logo from '../assets/nike_logo.svg';
import './Header.css';

class Header extends PureComponent {
  render() {
    return (
      <header>
        <a href="/"><img className="logo" src={logo} alt="Nike" /></a>
      </header>
    );
  }
};

export default Header;