import React, { PureComponent, Suspense, Component } from 'react';

import './Auth.scss';
import { Redirect, Link } from 'react-router-dom';
import { getCurrentUser } from '../../utils/auth';
import { authUser, showNotificationWithTimeout } from '../../redux/actions';
import { Dispatch } from 'redux';
import { AdminUser } from '../../types';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';

const mapDispatchToProps = (dispatch : Dispatch ) => {
  return {
    authUser: (user: AdminUser) => dispatch(authUser(user)),
    showNotificationWithTimeout: (type: string, message: string) => showNotificationWithTimeout(dispatch, type, message)
  }
}
class Login extends Component<any, any>{
  constructor(props: any){
    super(props);
    
    this.state = {
      email: '',
      password: '',
      redirect: false,
      loading: false
    }
  }
  

  onSubmit = (e: React.FormEvent) =>{
    e.preventDefault()
    this.setState({ loading: true })
    fetch('/auth/login', { 
      method: 'post', 
      body: JSON.stringify({ email: this.state.email, password: this.state.password }), 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (!res.ok) throw Error(res.status.toString())
      return res.json() 
    }).then((data) => {
      if (data.accessToken) {
        localStorage.setItem("user", JSON.stringify(data));
      }
      this.props.authUser(getCurrentUser())
      this.setState({ loading: false })
      this.setState({ redirect: true })
    }).catch((error) => {
      this.setState({ loading: false })
      this.props.showNotificationWithTimeout('error', 'Login failed. Please check your credentials.')
    })
  }

  render() {
    const { redirect, loading } = this.state;
    if (redirect) {
      return <Redirect to='/'/>
    }

    return (
      <div className="auth__container">
        <h1>LOGIN</h1>
        <div className="auth-profile__form">
          <form onSubmit={(e) => this.onSubmit(e)}>
            <div className="form-group"><label>Email</label> <input type="email" required onChange={(e) => { this.setState({email: e.target.value}) }} /></div>
            <div className="form-group"><label>Password</label> <input type="password" required onChange={(e) => { this.setState({password: e.target.value}) }} /></div>
            <input type="submit" value="Submit" />
          </form>
          <div className="auth__footer">
            <span>Are you a new member?</span>
            <Link to="/register"><button className="button -small">Register</button></Link>
          </div>
        </div>
        { loading ? <Loading /> : '' }
      </div>
    );
  }
};

export default connect(null, mapDispatchToProps)(Login);