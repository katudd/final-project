import React from "react"

// import Adminpage from "pages/admin/adminpage"
// import Contactform from "./contactform"
//
// export default class Fetchcontactform extends React.Component {
//
//   constructor(props) {
//     super(props)
//     this.state = {
//       fetchContact: []
//     }
//   }
//
//   componentDidMount() {
//     fetch("http://localhost:8080/contactform").then(response => {
//       return response.json()
//     }).then(json => {
//       console.log(json)
//       this.setState({
//         fetchContact: json
//       })
//     })
//   }
//
//   render() {
//     return (
//       <div className="fetch-contact-container">
//
//           <Contactform
//             key={contactinfo._id}
//             id={contactinfo._id}
//             date={contactinfo.date}
//             name={contactinfo.name}
//             email={contactinfo.email}
//             message={contactinfo.message} />
//
//       </div>
//     )
//   }
// }
