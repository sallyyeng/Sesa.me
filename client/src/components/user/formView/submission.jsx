import React from 'react';
import ReactDOM from 'react-dom';
import UserResponses from './userResponses.jsx';


class Submission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      contact: '',
      urgency: '',
      message: ''
    }
  }

  /* ================================ */
  /* Update state based on user input */
  /* ================================ */
  updateFirst(e) {
    this.setState({
      first: e.target.value
    });
  }

  updateLast(e) {
    this.setState({
      last: e.target.value
    });
  }

  updateContact(e) {
    this.setState({
      contact: e.target.value
    });
  }

  updateUrgency(e) {
    this.setState({
      urgency: e.target.value
    });
  }

  updateMessage(e) {
    this.setState({
      message: e.target.value
    });
  }

/* ===========================*/

  // on submission, call method to send form data to server
  onSubmit() {
    console.log('clicked');
    console.log('PROPS USERNAME', this.props.username);
    this.props.sendMessage(
      this.props.username,
      this.state.first,
      this.state.last,
      this.state.contact,
      this.state.urgency,
      this.state.message
    );
  }

  render() {
    return (
      <div>
        <div><h3>Hello {this.props.username}! Submit a bug report below:</h3></div>
        <div className="user-message-main">

          <label className="firstname">First Name:<input onChange={this.updateFirst.bind(this)}type="text" placeholder="first name"></input></label>
          <br></br>
          <label className="lastname">Last Name:<input onChange={this.updateLast.bind(this)}type="text" placeholder="last name"></input></label>
          <br></br>
          <label className="contact-info">How can we contact you?</label>
          <br></br>
          <textarea onChange={this.updateContact.bind(this)}type="text" placeholder="contact information"></textarea>
          <br></br>
          <div>Please rank the urgency of your situation on a scale of 1 through 5, where 1 is the least urgent, and 5 indicates that you are in immediate danger.
            <br></br>
            <label>1</label>
            <input onClick={this.updateUrgency.bind(this)} name="urgency" type="radio" value="1"></input>
            <label>2</label>
            <input onClick={this.updateUrgency.bind(this)} name="urgency" type="radio" value="2"></input>
            <label>3</label>
            <input onClick={this.updateUrgency.bind(this)} name="urgency" type="radio" value="3"></input>
            <label>4</label>
            <input onClick={this.updateUrgency.bind(this)} name="urgency" type="radio" value="4"></input>
            <label>5</label>
            <input onClick={this.updateUrgency.bind(this)} name="urgency" type="radio" value="5"></input>
          </div>
          <br></br>
          <label className="message">Please provide any information about your situation that we may use to help you:</label>
          <br></br>
          <textarea onChange={this.updateMessage.bind(this)}type="text" placeholder="Additional information..."></textarea>
          <br></br>
          <button onClick={this.onSubmit.bind(this)}>Submit Message</button>
        </div>

        <UserResponses retrieveResponses={this.props.retrieveResponses.bind(this)} username={this.props.username}/>

      </div>
    )
  }
}

export default Submission;