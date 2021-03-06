import React, { Component } from 'react';
import './App.scss';
import Header from './admin/Header';
import ProductOverviewContainer from './ProductOverviewContainer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Admin from './admin/Admin';
import Login from './auth/Login';
import { AdminState, AdminUser, Product } from '../types';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getCurrentUser } from '../utils/auth';
import { authUser, initProductsCart, fetchProducts, fetchProductsSuccess, fetchProductsError, showNotificationWithTimeout, fetchStoreProducts } from '../redux/actions';
import Loading from '../components/Loading';
import Register from './auth/Register';
import Toast from '../components/Toast';
import Cart from './cart/Cart';

const mapStateToProps = (state: { admin : AdminState }) => {
  return {
    loading: state.admin.loading,
    user: state.admin.user
  }
}

const mapDispatchToProps = (dispatch : Dispatch ) => {
  return {
    authUser: (user: AdminUser) => dispatch(authUser(user)),
    initProductsCart: () => dispatch(initProductsCart()),
    showNotificationWithTimeout: (type: string, message: string) => showNotificationWithTimeout(dispatch, type, message),
    fetchStoreProducts: () => fetchStoreProducts(dispatch)
  }
}

interface IAppProps {
  loading: boolean,
  user: AdminUser | null,
  authUser: {(user: AdminUser): void},
  initProductsCart: {(): void},
  showNotificationWithTimeout: {(type: string, message: string): void},
  fetchStoreProducts: {(): void}
}

interface IAppState {
  
}

class App extends Component<IAppProps, IAppState> {

  componentDidMount(){
    const user = getCurrentUser()
    this.props.authUser(user as AdminUser)
    this.props.initProductsCart()
    this.fetchShopProducts()
  }

  fetchShopProducts(){
    this.props.fetchStoreProducts()
  }


  isConnected(){
    return this.props.user != null && this.props.user.accessToken != null
  }

  render() {
    if (this.props.loading){
      return (
        <div className="app__container-loading">
          <Loading />
        </div>
      )
    }
    
    return (
      <div>
        <Router>
          <Toast />
          <Header user={this.props.user} connected={this.isConnected()} />
          <main>
            <Switch>
              <Route exact path="/">
                <ProductOverviewContainer />
              </Route>
              <Route exact path="/cart" render={() => <Cart />} />
              <Route exact path="/login" render={() => ( this.isConnected() ? <Redirect to="/" /> : <Login />)} />
              <Route exact path="/register" render={() => ( this.isConnected() ? <Redirect to="/" /> : <Register />)} />
              <Route path="/admin" render={() => ( this.isConnected() ? <Admin /> : <Redirect to="/" />)} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </main>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
