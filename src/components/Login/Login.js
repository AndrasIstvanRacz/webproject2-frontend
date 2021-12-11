import React from "react";
import './LoginStyle.css';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      username : "",
      password : "",
      token: "",
      failedLogin: false,
      redirect: false,
    }
  }

  handleLoginClick = event => {
    let self = this;
    event.preventDefault()
    axios.post('/api/user/authenticate', {
      username: this.state.username,
      password: this.state.password
    })
      .then(function (response) {
        self.setState({
          failedLogin: false,
          redirect: true,
          token: response.data
        })
        console.log(response);
      })
      .catch(function (error) {
        self.setState({failedLogin: true})
        console.log(error);
      });

    console.log(this.state)
  }

  render() {
    if (this.state.redirect){
      return <Redirect to={{
        pathname:'/todolist',
        state: {
          username: this.state.username,
          token: this.state.token
        }}}/>
    }
    return (
      <div className="container">
        <h1>Login</h1>
        <form>
          <div data-validate="Enter username">
            <input className="loginInput" type="text"
                   onChange={e => this.setState(
                     {...this.state, username: e.target.value})}
                   value={this.state.username}
                   placeholder="Email"/>
          </div>
          <div data-validate="Enter password">
            <input className="loginInput" type="password"
                   onChange={e => this.setState(
                     {...this.state, password: e.target.value})}
                   value={this.state.password}
                   placeholder="Password"/>
          </div>
          <div >
            <button className="loginButton" onClick={this.handleLoginClick}>
              Login
            </button>
            <Link to="/registration">
              Sing Up
            </Link>
          </div>
        </form>
        {
          this.state.failedLogin ?
          <p className="LoginError">You have entered an invalid username or password</p>
            : null
        }
      </div>
    );
  }

}
export default Login;