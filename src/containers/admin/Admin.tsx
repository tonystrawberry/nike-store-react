import React, { PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Loading from '../../components/Loading';

import { AdminState } from '../../types';
import avatar from '../../assets/avatar.jpg';

import './Admin.scss';
import { NavLink, BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AdminProducts from './AdminProducts';
import AdminProfile from './AdminProfile';
import { logoutUser } from '../../utils/auth';
import { logout } from '../../redux/actions';
import signout  from '../../assets/signout.svg';
import store from '../../assets/store.svg';
import user from '../../assets/user.svg';

const mapStateToProps = (state: { admin : AdminState }) => {
  return {
    loading: state.admin.loading
  }
}

const mapDispatchToProps = (dispatch : Dispatch ) => {
  return {
    logout: () => dispatch(logout())
  }
}
interface IAdminProps {
  loading: boolean,
  logout: {(): void}
}

interface IAdminState {
  
}

class Admin extends PureComponent<IAdminProps, IAdminState> {

  state = {
    logout: false
  }

  onLogout = (e: React.FormEvent) =>{
    e.preventDefault()
    logoutUser()
    this.props.logout()
    this.setState({logout: true})
  }


  render() {

    if (this.props.loading){
      return(
        <div className="admin__container">
          <Loading />
        </div>
      )
    }

    if (this.state.logout){
      return <Redirect to='/'/>;
    }

    return (
      <Router>
        <div className="admin__container">
          <div className="admin__sidebar">
            <div className="admin__avatar-container">
              <img src={avatar}>

              </img>
            </div>
            <div className="admin__menu-container">
              <ul>
                <li><NavLink to="/admin/profile" activeClassName='active' >PROFILE</NavLink></li>
                <li><NavLink to="/admin/products" activeClassName='active'>YOUR PRODUCTS</NavLink></li>
              </ul>
            </div>
            <div className="admin__footer-container">
              <button className="button -secondary" onClick={this.onLogout}>Sign out</button>
            </div>
          </div>
          <div className="admin__footbar">
            <div><NavLink to="/admin/profile" activeClassName='active' ><img src={user} /></NavLink></div>
            <div><NavLink to="/admin/products" activeClassName='active'><img src={store} /></NavLink></div>
            <div><img src={signout} onClick={this.onLogout} /></div>
          </div>
          <div className="admin__main">
            
              <Switch>
                <Route path="/admin/profile">
                  <AdminProfile />
                </Route>
                <Route path="/admin/products">
                  <AdminProducts />
                </Route>
              </Switch>
            
          </div>
        </div>
      </Router>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);