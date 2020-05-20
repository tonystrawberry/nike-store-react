import React, { PureComponent, Component } from 'react';
import './App.css';
import Header from '../components/Header';
import ProductOverviewContainer from './ProductOverviewContainer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Admin from './admin/Admin';
import Login from './auth/Login';
import { AdminState, AdminUser } from '../types';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getCurrentUser } from '../utils/auth';
import { authUser } from '../redux/actions';

const mapStateToProps = (state: { admin : AdminState }) => {
  return {
    loading: state.admin.loading,
    user: state.admin.user
  }
}

const mapDispatchToProps = (dispatch : Dispatch ) => {
  return {
    authUser: (user: AdminUser) => dispatch(authUser(user))
  }
}

interface IAppProps {
  loading: boolean,
  user: AdminUser | null,
  authUser: {(user: AdminUser): void}
}

interface IAppState {
  
}

class App extends Component<IAppProps, IAppState> {

  componentDidMount(){
    const user = getCurrentUser()
    console.log("user", user)
    this.props.authUser(user as AdminUser)
  }

  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <ProductOverviewContainer />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/admin" render={() => ( this.props.user != null ? <Admin /> : <Redirect to="/" />)} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
