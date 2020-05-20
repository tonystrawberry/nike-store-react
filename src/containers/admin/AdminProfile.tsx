import React, { PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AdminState } from '../../types';

import './AdminProfile.css';
import './AdminCommon.css';
import { onChangeProfileInput } from '../../redux/actions';
import { authHeader } from '../../utils/auth';

const mapStateToProps = (state: { admin : AdminState }) => {
  return {
    fullName: state.admin.profile.fullName,
    username: state.admin.profile.username,
    email: state.admin.profile.email,
    password: state.admin.profile.password,
  }
}

const mapDispatchToProps = (dispatch : Dispatch ) => {
  return {
    onChangeProfileInput: (key: string, value: string) => { dispatch(onChangeProfileInput(key, value)) }
  }
}
interface IAdminProfileProps {
  fullName: string,
  username: string,
  email: string,
  password: string,
  onChangeProfileInput: {(key: string, value: string): void}
}

interface IAdminProfileState {
  
}

class AdminProfile extends PureComponent<IAdminProfileProps, IAdminProfileState> {

  onSubmit(e: React.FormEvent){
    e.preventDefault()
    let profile = {
      fullName: this.props.fullName,
      username: this.props.username,
      email: this.props.email,
      password: this.props.password
    }

    fetch('/api/admin/profile', { method: 'post', body: JSON.stringify({ profile: profile }), headers: authHeader() as Headers})
      .then((res) => { return res.json() })
      .then((data) => { 
        console.log("data", data)
      })
    
  }

  render() {
    return (
      <div className="admin-profile__container admin-main__container">
        <h1>PROFILE</h1>
        <div className="admin-profile__form">
          <form onSubmit={this.onSubmit}>
            <div className="form-group"><label>Full Name</label> <input type="text" required onChange={(e) => { this.props.onChangeProfileInput('fullName', e.target.value) }} /></div>
            
            <div className="form-group"><label>Username</label> <input type="text" required onChange={(e) => { this.props.onChangeProfileInput('username', e.target.value) }} /></div>
            <div className="form-group"><label>Email</label> <input type="email" required onChange={(e) => { this.props.onChangeProfileInput('email', e.target.value) }} /></div>
            <div className="form-group"><label>Password</label> <input type="password" required onChange={(e) => { this.props.onChangeProfileInput('password', e.target.value) }} /></div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);