import React, { PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AdminState, AdminUser } from '../../types';

import './AdminProfile.css';
import './AdminCommon.css';
import { onChangeProfileInput, showToast, authUser } from '../../redux/actions';
import { authHeader, getCurrentUser } from '../../utils/auth';
import Loading from '../../components/Loading';

const mapStateToProps = (state: { admin : AdminState }) => {
  return {
    fullName: state.admin.profile.fullName,
    username: state.admin.profile.username,
    email: state.admin.profile.email,
    user: state.admin.user as AdminUser
  }
}

const mapDispatchToProps = (dispatch : Dispatch ) => {
  return {
    onChangeProfileInput: (key: string, value: string) => { dispatch(onChangeProfileInput(key, value)) },
    showToast: (type: string, message: string) => dispatch(showToast(type, message)),
    authUser: (user: AdminUser) => dispatch(authUser(user))
  }
}
interface IAdminProfileProps {
  fullName: string,
  username: string,
  email: string,
  user: AdminUser,
  showToast: {(type: string, message: string): void}
  onChangeProfileInput: {(key: string, value: string): void},
  authUser: {(user: AdminUser): void}
}

interface IAdminProfileState {
  id: string,
  fullName: string,
  username: string,
  email: string,
  loading: boolean
}

class AdminProfile extends PureComponent<IAdminProfileProps, IAdminProfileState> {

  constructor(props: IAdminProfileProps){
    super(props);

    this.state = {
      id: "",
      fullName: "",
      username: "",
      email: "",
      loading: true
    }
  }

  componentDidMount() {
    fetch('/api/users/' + this.props.user.id)
    .then(res => {
      if (!res.ok) throw new Error(res.statusText)
      return res.json()
    })
    .then((body: any) => {
      console.log("body", body)
      this.setState({
        loading: false, id: body._id, fullName: body.fullName, username: body.username, email: body.email
      })
    }).catch(error => {
      console.log(error)
      this.props.showToast('error', 'Could not get user data. Please refresh the page.')
    });
  }

  onSubmit(e: React.FormEvent){
    e.preventDefault()
    let user = {
      id: this.state.id,
      fullName: this.state.fullName,
      username: this.state.username,
      email: this.state.email
    }

    fetch('/api/users', { 
      method: 'put', 
      body: JSON.stringify({ user: user }), 
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }})
      .then((res) => { 
        if (!res.ok) throw new Error(res.statusText)
        return res.json() })
      .then((data) => {
        console.log("data", data);
        if (data.accessToken) {
          localStorage.setItem("user", JSON.stringify(data));
        }
        this.props.authUser(getCurrentUser())

        this.props.showToast('success', 'Profile has been updated.')
      }).catch(error => {
        console.log(error)
        this.props.showToast('error', 'Could not update user profile. Please try again.')
      });
  }

  render() {
    if (this.state.loading){
      return (
        <div className="admin-profile__container admin-main__container">
          <Loading />
        </div>
      )
    }
    return (
      <div className="admin-profile__container admin-main__container">
        <h1>PROFILE</h1>
        <div className="admin-profile__form">
          <form onSubmit={(e) => this.onSubmit(e)}>
            <div className="form-group"><label>Full Name</label> <input type="text" value={this.state.fullName} required onChange={(e) => { this.setState({fullName: e.target.value}) }} /></div>
            <div className="form-group"><label>Username</label> <input type="text" value={this.state.username}required onChange={(e) => { this.setState({username: e.target.value}) }} /></div>
            <div className="form-group"><label>Email</label> <input type="email" value={this.state.email}required onChange={(e) => { this.setState({email: e.target.value}) }} /></div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);