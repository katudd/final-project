import React from "react"
import ReactMarkdown from "react-markdown"

// import "../pages/story/style.css"
import "./shortstory.css"

export default class Shortstory extends React.Component {
  render() {
    return (
      <div className="shortstory-container">
        <div className="shortstory-image-container">
          <img id="shortstory-image" src={this.props.image} alt="" />
        </div>
        <p className="caption">{this.props.caption}</p>
        <div className="shortstory-text-container">
          <h2 className="heading">{this.props.heading}</h2>
          <div className="shorttext"><ReactMarkdown source={this.props.shortText} /></div>
        </div>
      </div>
    )
  }
}
