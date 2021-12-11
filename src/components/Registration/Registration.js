import React from "react";
import './RegistrationStyel.css';
import axios from "axios";
import {Redirect} from "react-router-dom";

class Registration extends React.Component {

  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      redirect: false,
      userExists: false
    }
  }

  handleSubmit = event => {
    let self = this
    event.preventDefault()
    axios.post('/api/user/register', {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    })
      .then(function (response) {
        self.setState({
          failedRegistration: false,
          redirect: true,
          userExists: false
        })
        console.log(response);
      })
      .catch(function (error) {
        self.setState({
          failedRegistration: false,
          userExists: true,
          redirect: false
        })
        console.log(error);
      });
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/'
      }}/>
    }
    return (
      <div className="registrationContainer">
        <h1>Sing Up</h1>
        <form onSubmit={this.handleSubmit}>

          <div data-validate="Enter username">
            <input className="registrationInput" type="text"
                   onChange={e => this.setState(
                     {...this.state, username: e.target.value})}
                   value={this.state.username}
                   placeholder="Username"/>
          </div>
          <div data-validate="Enter email">
            <input className="registrationInput" type="text"
                   onChange={e => this.setState(
                     {...this.state, email: e.target.value})}
                   value={this.state.email}
                   placeholder="Email"/>
          </div>
          <div data-validate="Enter password">
            <input className="registrationInput" type="password"
                   onChange={e => this.setState(
                     {...this.state, password: e.target.value})}
                   value={this.state.password}
                   placeholder="Password"/>
          </div>
          <div>
            <button className="registrationButton" type="submit">
              Sing Up
            </button>
          </div>
        </form>
        {
          this.state.userExists ?
            <p className="registrationError">This username already taken</p>
            : null
        }
      </div>
    );
  }
}

export default Registration;