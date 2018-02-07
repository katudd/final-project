import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"

import "pages/start/style.css"

const year = moment().format("YYYY")

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <i className="fa fa-copyright" aria-hidden="true"><span className="copyright>">{year}</span></i>
        <ul>
          <li><Link to="/login">Admin</Link></li>
        </ul>
      </footer>
    )
  }
}
