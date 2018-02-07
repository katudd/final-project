import React from "react"
// import Adminpage from "pages/admin/adminpage"

export default class Contactform extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      message: "",
      messagesreply: ""
    }
  }

handleName = event => {
  this.setState({
    name: event.target.value
  })
}

handleEmail = event => {
  this.setState({
    email: event.target.value
  })
}

handleMessage = event => {
  this.setState({
    message: event.target.value
  })
}

getMessagereply = () => {
  if (this.state.messagereply) {
    return <p>{this.state.messagereply}</p>
  }
}

handleSubmit = event => {
  event.preventDefault()
  fetch("http://localhost:8080/contactform", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.state)
  }).then(response => (
    this.setState({
      name: "",
      email: "",
      message: "",
      messagereply: "Meddelandet skickat!"
    }, () => { console.log("State has been reset", response, response.status) })
  ))
}

render() {
  return (
    <div className="contactform-container">
      <form onSubmit={this.handleSubmit}>
        <input type="text" required placeholder="Namn" value={this.state.name} onChange={this.handleName} />
        <input type="email" required placeholder="Email" value={this.state.email} onChange={this.handleEmail} />
        <input type="text" required placeholder="Meddelande" value={this.state.message} onChange={this.handleMessage} />
        <div className="message">
          {this.getMessagereply()}
        </div>
        <button>Skicka</button>
      </form>
    </div>
  )
}
}
