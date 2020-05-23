import React from 'react';
import logo from '../assets/nike_logo.svg';
import admin from '../assets/admin.svg';
import './Header.scss';
import { Link } from 'react-router-dom';
import { AdminUser } from '../types';

interface IHeaderProps {
  connected: boolean,
  user: AdminUser | null
}

const Header = (props: IHeaderProps) => {
  return (
    <header>
      <Link to="/"><img className="logo" src={logo} alt="Nike" /></Link>
      {
        props.connected ? 
          <React.Fragment>
            <div className="right">
              <div>Welcome {props.user != null ? props.user.username : ''}</div>
              <Link className="admin right" to="/admin"><img width="20" src={admin} alt="Admin" /></Link>
            </div>
          </React.Fragment>
        : 
          <React.Fragment>
            <div className="right">
              <Link className="login" to="/login"><button className="button">Sign in</button></Link>
            </div>
          </React.Fragment>
      }
    </header>
  );
};

export default Header;