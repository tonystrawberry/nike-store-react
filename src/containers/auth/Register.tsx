import React, { PureComponent, Suspense, Component } from 'react';

import './Auth.css';
import { Redirect, Link } from 'react-router-dom';
import { getCurrentUser } from '../../utils/auth';
import { authUser } from '../../redux/actions';
import { Dispatch } from 'redux';
import { AdminUser } from '../../types';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';

const mapDispatchToProps = (dispatch : Dispatch ) => {
  return {
    authUser: (user: AdminUser) => dispatch(authUser(user))
  }
}
class Register extends Component<any, any>{
  constructor(props: any){
    super(props);
    
    this.state = {
      email: '',
      password: '',
      fullName: '',
      username: '',
      redirect: false,
      loading: false
    }
  }
  

  onSubmit = (e: React.FormEvent) =>{
    e.preventDefault()
    this.setState({ loading: true })
    fetch('/api/register', { 
      method: 'post', 
      body: JSON.stringify({ fullName: this.state.fullName, username: this.state.username, email: this.state.email, password: this.state.password }), 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => { return res.json() })
    .then((data) => {
      if (data.accessToken) {
        localStorage.setItem("user", JSON.stringify(data));
      }
      this.props.authUser(getCurrentUser())
      this.setState({ loading: false })
      this.setState({ redirect: true })
    }).catch((error) => {
      this.props.showToast('error', 'Login failed. Please check your credentials.')
      this.setState({ loading: false })
      
    })
  }

  render() {
    const { redirect, loading } = this.state;
    if (redirect) {
      return <Redirect to='/'/>;
    }

    if (loading) {
      return <Loading />
    }

    return (
      <div className="auth__container">
        <h1>REGISTER</h1>
        <div className="auth-profile__form">
          <form onSubmit={(e) => this.onSubmit(e)}>
          <div className="form-group"><label>Full Name</label> <input type="text" required onChange={(e) => { this.setState({fullName: e.target.value}) }} /></div>
            <div className="form-group"><label>Username</label> <input type="text" required onChange={(e) => { this.setState({username: e.target.value}) }} /></div>
            <div className="form-group"><label>Email</label> <input type="email" required onChange={(e) => { this.setState({email: e.target.value}) }} /></div>
            <div className="form-group"><label>Password</label> <input type="password" required onChange={(e) => { this.setState({password: e.target.value}) }} /></div>
            <input type="submit" value="Submit" />
          </form>
          <div className="auth__footer">
            <span>Are you already a member?</span>
            <Link to="/login"><button className="button -small">Login</button></Link>
          </div>
        </div>
        { loading ? <Loading /> : '' }
      </div>
    );
  }
};

export default connect(null, mapDispatchToProps)(Register);