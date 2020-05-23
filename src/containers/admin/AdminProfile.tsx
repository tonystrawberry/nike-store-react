import React, { PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AdminState, AdminUser } from '../../types';

import './AdminProfile.scss';
import './AdminCommon.scss';
import { onChangeProfileInput, authUser, showNotificationWithTimeout } from '../../redux/actions';
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
    showNotificationWithTimeout: (type: string, message: string) => showNotificationWithTimeout(dispatch, type, message),
    authUser: (user: AdminUser) => dispatch(authUser(user))
    
  }
}
interface IAdminProfileProps {
  fullName: string,
  username: string,
  email: string,
  user: AdminUser,
  showNotificationWithTimeout: {(type: string, message: string): void}
  onChangeProfileInput: {(key: string, value: string): void},
  authUser: {(user: AdminUser): void}
}

interface IAdminProfileState {
  id: string,
  fullName: string,
  username: string,
  email: string,
  originalFullName: string,
  originalUsername: string,
  originalEmail: string,
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
      originalFullName: "",
      originalUsername: "",
      originalEmail: "",
      loading: true
    }
  }

  componentDidMount() {
    fetch('/api/users/' + this.props.user.id, { headers: authHeader()})
    .then(res => {
      if (!res.ok) throw new Error(res.statusText)
      return res.json()
    })
    .then((body: any) => {
      this.setState({
        loading: false, id: body._id, fullName: body.fullName, username: body.username, email: body.email, originalFullName: body.fullName, originalUsername: body.username, originalEmail: body.email
      })
    }).catch(error => {
      this.props.showNotificationWithTimeout('error', 'Could not get user data. Please refresh the page.')
    });
  }

  onSubmit(e: React.FormEvent){
    e.preventDefault()
    this.setState({ loading: true })
    let user = {
      id: this.state.id,
      fullName: this.state.fullName,
      username: this.state.username,
      email: this.state.email,
      originalFullName: this.state.fullName,
      originalUsername: this.state.username,
      originalEmail: this.state.email
    }

    fetch('/api/users', { 
      method: 'put', 
      body: JSON.stringify({ user: user }), 
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ... authHeader()
      }
    }).then((res) => { 
      return res.json().then(json => ({status: res.status, body: json}))
    }).then((data) => {
      const status = data.status
      const body = data.body

      if (status != 200) {
        this.props.showNotificationWithTimeout('error', body.errors[0].title)
        this.setState({ loading: false })
        return
      }

      if (body.accessToken) {
        localStorage.setItem("user", JSON.stringify(body)); 
      }
      this.props.authUser(getCurrentUser())

      this.props.showNotificationWithTimeout('success', 'Profile has been updated.')
      this.setState({ loading: false })
    }).catch(error => {
      this.props.showNotificationWithTimeout('error', 'Could not update user profile. Please try again.')
      this.setState({ loading: false })
    });
  }

  hasChanges(){
    return this.state.originalFullName != this.state.fullName || this.state.originalEmail != this.state.email || this.state.originalUsername != this.state.username
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
            <button className="button -large" disabled={!this.hasChanges()} type="submit" >Submit</button>
          </form>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);