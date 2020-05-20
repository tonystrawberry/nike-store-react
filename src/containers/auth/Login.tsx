import React, { PureComponent, Suspense, Component } from 'react';

import './Auth.css';
import { Redirect } from 'react-router-dom';

class Login extends Component<any, any>{
  constructor(props: any){
    super(props);
    
    this.state = {
      email: '',
      password: '',
      redirect: false
    }


  }

  onSubmit = (e: React.FormEvent) =>{
    e.preventDefault()
    console.log(this.state.email)
    console.log(this.state.password)
    fetch('/api/login', { 
      method: 'post', 
      body: JSON.stringify({ email: this.state.email, password: this.state.password }), 
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
      this.setState({ redirect: true })
    })
  }

  render() {
    const { redirect } = this.state;
     if (redirect) {
       return <Redirect to='/'/>;
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
        </div>
      </div>
    );
  }
};

export default Login;