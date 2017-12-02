import React from 'react';
import ReactDOM from 'react-dom';
//import UserResponses from './userResponses.jsx';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Checkbox from 'react-bootstrap/lib/Checkbox';


class Submission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: '',
      urgency: '',
      message: '',
    };
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
  onSubmit() {
    this.props.sendMessage(
      this.props.username,
      this.state.contact,
      this.state.urgency,
      this.state.message,
    );
  }

  render() {
    return (
      <div className="user-submission-main">
        <div className="user-submission-container">
          <ControlLabel className="contact-info">How can we contact you?</ControlLabel>
          <br />
          <FormControl componentClass="textarea" onChange={this.updateContact.bind(this)}type="text" placeholder="contact information" />
          <br />

          <div>
            <ControlLabel>Please rank the urgency of this bug on a scale of 1 through 5, where 1 is the least urgent, and 5 indicates that the bug is of immediate urgency.</ControlLabel>
            <br />
            <span>1</span>
            <input onClick={this.updateUrgency.bind(this)} name="urgency" type="radio" value="1" />
            <span>2</span>
            <input onClick={this.updateUrgency.bind(this)} name="urgency" type="radio" value="2" />
            <span>3</span>
            <input onClick={this.updateUrgency.bind(this)} name="urgency" type="radio" value="3" />
            <span>4</span>
            <input onClick={this.updateUrgency.bind(this)} name="urgency" type="radio" value="4" />
            <span>5</span>
            <input onClick={this.updateUrgency.bind(this)} name="urgency" type="radio" value="5" />
          </div>
          <br />

          <ControlLabel className="message">Please provide any information about the bug that we may use to help you:</ControlLabel>
          <br />
          <FormControl componentClass="textarea" onChange={this.updateMessage.bind(this)}type="text" placeholder="Additional information..." />
          <br />
          <Button bsStyle="primary" onClick={this.onSubmit.bind(this)}>Go to Game!</Button>

        </div>

      </div>
    );
  }
}

export default Submission;
