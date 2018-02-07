import React from "react"
//import { Link } from "react-router-dom"
import AdminLoginForm from "components/adminloginform"

export default class AdminLoginPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      accessToken: "",
      userId: ""
    }
  }

  // handle admin login

  handleLoginSuccess = user => {
    this.setState({
      accessToken: user.accessToken,
      userId: user._id
    })
    localStorage.setItem("accessToken", user.accessToken)
    localStorage.setItem("userId", user._id)
    this.props.history.push("/admin")
  }

  isLoggedIn = () => (
    this.state.accessToken && this.state.userId
  )

  render() {
    return (
      <div>
        {this.isLoggedIn()
          ? <h1>Välkommen!</h1>
          : <AdminLoginForm onLoginSuccess={this.handleLoginSuccess} />}
      </div>
    )
  }

}
