import React, { PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Loading from '../../components/Loading';

import { AdminState, Product } from '../../types';
import avatar from '../../assets/avatar.jpg';

import './Admin.css';
import { Link, useLocation, NavLink, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminProducts from './AdminProducts';
import AdminProfile from './AdminProfile';

const mapStateToProps = (state: { admin : AdminState }) => {
  return {
    loading: state.admin.loading
  }
}

const mapDispatchToProps = (dispatch : Dispatch ) => {
  return {
  }
}
interface IAdminProps {
  loading: boolean,
}

interface IAdminState {
  
}

class Admin extends PureComponent<IAdminProps, IAdminState> {

  render() {

    if (this.props.loading){
      return(
        <div className="admin__container">
          <Loading />
        </div>
      )
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