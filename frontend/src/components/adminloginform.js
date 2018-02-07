import React from "react"
// import { Link } from "react-router-dom"

import "./adminlogin.css"

export default class AdminLoginForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      errors: {}
    }
  }

  handleFormSubmit = event => {
    event.preventDefault()
    console.log("Login form submitted")

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(this.state)
    }

    fetch("http://localhost:8080/adminlogin", payload)
      .then(response => response.json())
      .then(json => {
        if (json.errors) {
          this.setState({
            errors: json.errors
          })
        } else {
          this.props.onLoginSuccess(json)
        }
      })
      .catch(err => {
        console.error("Promise rejected", err)
      })
  }

  handleUsernameChange = event => {
    this.setState({
      username: event.target.value
    })
  }

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    })
  }

  render() {
    return (
      <div className="Login">
        <h2><span className="white-text">Logga in till administratörssidan</span></h2>
        <div className="admin-login-container">
          <form onSubmit={this.handleFormSubmit}>
            <label>
              Användarnamn
              <span>{this.state.errors.username}</span>
              <input
                onChange={this.handleUsernameChange}
                value={this.state.username}
                required
                placeholder="Skriv ditt användarnamn här"
                type="text" />
            </label>

            <label>
              Lösenord
              <input
                onChange={this.handlePasswordChange}
                value={this.state.password}
                required
                placeholder="Skriv ditt lösenord här"
                type="password" />
            </label>

            <button>Log in</button>
          </form>
        </div>
      </div>
    )
  }

}
