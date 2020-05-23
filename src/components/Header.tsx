import React, { Component } from 'react';
import logo from '../assets/nike_logo.svg';
import menu from '../assets/menu.svg';
import './Header.scss';
import { Link } from 'react-router-dom';
import { AdminUser } from '../types';
import close from '../assets/close.svg';

interface IHeaderProps {
  connected: boolean,
  user: AdminUser | null
}

interface IHeaderState {
  menuActive: boolean
}

class Header extends Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps){
    super(props)

    this.state = {
      menuActive: false
    }
  }

  render(){
    return (
      <header>
        <Link to="/"><img className="logo" src={logo} alt="Nike" /></Link>
        {
          this.props.connected ? 
            <React.Fragment>
              <div className="menu right">
                {/* <Link className="menu right" to="/admin"><img width="20" src={menu} alt="Menu" /></Link> */}
                <img width="20" src={menu} alt="Menu" onClick={() => { this.setState({menuActive: !this.state.menuActive}) }} />
              </div>
              <div className={`menu__dropdown-mobile ${this.state.menuActive ? 'active' : ''}`}>
                <div><Link className="" to="/admin" onClick={() => { this.setState({ menuActive: false }) }}>ACCOUNT</Link></div>
                <div className="close"><img width="40px" src={close} onClick={() => this.setState({menuActive: !this.state.menuActive})}></img></div>
              </div>

              <div className={`menu__dropdown ${this.state.menuActive ? 'active' : ''}`}>
                <ul>
                  <li><Link className="menu right" to="/admin" onClick={() => { this.setState({ menuActive: false }) }}>ACCOUNT</Link></li>
                </ul>
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
  }
};

export default Header;