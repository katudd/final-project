import React from "react"

import Longstory from "components/longstory"
import "./style.css"

export default class Storypage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      storiesList: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:8080/adminstory").then(response => {
      return response.json()
    }).then(json => {
      console.log(json)
      this.setState({
        storiesList: json
      })
    })
  }

  render() {
    return (
      <div className="stories-list">
        {this.state.storiesList.map(story => {
          return <Longstory
            key={story._id}
            id={story._id}
            heading={story.heading}
            longText={story.longText}
            image={story.image}
            caption={story.caption} />
        })}
      </div>
    )
  }
}
