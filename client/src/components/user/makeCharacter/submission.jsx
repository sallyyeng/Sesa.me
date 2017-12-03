import React from 'react';
import ReactDOM from 'react-dom';
//import UserResponses from './userResponses.jsx';
import { withRouter, Link } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Checkbox from 'react-bootstrap/lib/Checkbox';


class Submission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      phoneNumber: '',
    };

    this.updateInfo = this.updateInfo.bind(this);
  }


  updateInfo(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  updateContact(e) {
    this.setState({
      contact: e.target.value,
    });
  }

  updateUrgency(e) {
    this.setState({
      urgency: e.target.value,
    });
  }

  updateMessage(e) {
    this.setState({
      message: e.target.value,
    });
  }

  /* =========================== */

  // on submission, call method to send form data to server
  onSubmit({history}) {
    var userLocation = {
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      country: this.state.country,
    }
    var userInfo = {
      username: this.props.username,
      name: this.state.name,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      location: userLocation,
    }

    console.log('username', this.props.username)
    this.props.sendMessage(userInfo)
      .then(() => {
        console.log('inside then stmt after post from submission')
        history.push('/PacManGame')
      })
      .catch(() => console.log('there was an error'));
  }

  render() {
    const ButtonGoToGame = withRouter(({history}) => (
      <Button
        bsStyle="primary"
        onClick={() => {
          this.onSubmit({history});
        }}>
        Go To Game!</Button>
    ))
    return (
      <div className="user-submission-main">
        <div className="user-submission-container">

          <ControlLabel className="contact-info">Name</ControlLabel>
          <br />
          <FormControl bsSize="sm" name="name" componentClass="textarea" onChange={this.updateInfo.bind(this)}type="text" placeholder="Name" />
          <br />

          <ControlLabel className="contact-info">Email</ControlLabel>
          <br />
          <FormControl bsSize="sm" name="email" componentClass="textarea" onChange={this.updateInfo.bind(this)}type="email" placeholder="Email" />
          <br />

          <ControlLabel className="contact-info">Address</ControlLabel>
          <br />
          <FormControl bsSize="small" name="address" componentClass="textarea" onChange={this.updateInfo.bind(this)}type="text" placeholder="Address" />
          <br />

          <ControlLabel className="contact-info">City</ControlLabel>
          <br />
          <FormControl componentClass="textarea" name="city" onChange={this.updateInfo.bind(this)}type="text" placeholder="City" />
          <br />

          <ControlLabel className="contact-info">State</ControlLabel>
          <br />
          <FormControl componentClass="textarea" name="state" onChange={this.updateInfo.bind(this)}type="text" placeholder="State" />
          <br />

          <ControlLabel className="contact-info">Zip</ControlLabel>
          <br />
          <FormControl componentClass="textarea" name="zip" onChange={this.updateInfo.bind(this)}type="text" placeholder="Zip" />
          <br />

          <ControlLabel className="contact-info">Country</ControlLabel>
          <br />
          <FormControl componentClass="textarea" name="country" onChange={this.updateInfo.bind(this)}type="text" placeholder="Country" />
          <br />

          <ControlLabel className="contact-info">Phone Number</ControlLabel>
          <br />
          <FormControl componentClass="textarea" name="phoneNumber" onChange={this.updateInfo.bind(this)}type="text" placeholder="Phone Number" />
          <br />

          <ButtonGoToGame/>
          </div>

          </div>
        );
      }
    }

    export default Submission;

// <Button bsStyle="primary" onClick={this.onSubmit.bind(this)}>Go to Game!</Button>
// render() {
//     return (
//       <div className="user-submission-main">
//         <div className="user-submission-container">
//           <ControlLabel className="contact-info">How can we contact you?</ControlLabel>
//           <br />
//           <FormControl componentClass="textarea" onChange={this.updateContact.bind(this)}type="text" placeholder="contact information" />
//           <br />

//           <div>
//             <ControlLabel>Please rank the urgency of this bug on a scale of 1 through 5, where 1 is the least urgent, and 5 indicates that the bug is of immediate urgency.</ControlLabel>
//             <br />
//             <span>1</span>
//             <input onClick={this.updateUrgency.bind(this)} name="urgency" type="radio" value="1" />
//             <span>2</span>
//             <input onClick={this.updateUrgency.bind(this)} name="urgency" type="radio" value="2" />
//             <span>3</span>
//             <input onClick={this.updateUrgency.bind(this)} name="urgency" type="radio" value="3" />
//             <span>4</span>
//             <input onClick={this.updateUrgency.bind(this)} name="urgency" type="radio" value="4" />
//             <span>5</span>
//             <input onClick={this.updateUrgency.bind(this)} name="urgency" type="radio" value="5" />
//           </div>
//           <br />

//           <ControlLabel className="message">Please provide any information about the bug that we may use to help you:</ControlLabel>
//           <br />
//           <FormControl componentClass="textarea" onChange={this.updateMessage.bind(this)}type="text" placeholder="Additional information..." />
//           <br />
//           <Button bsStyle="primary" onClick={this.onSubmit.bind(this)}>Go to Game!</Button>

//         </div>

//       </div>
//     );
//   }
// }

