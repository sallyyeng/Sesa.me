import React from 'react';
import ReactDOM from 'react-dom';

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

  render() {
    return (
      <div>
        <div>User Submission View: This will be rendered conditionally</div>
        <div className="user-message-main">
          <h5>New Message</h5>
          <label className="firstname">First Name:<input type="text" placeholder="first name"></input></label>
          <br></br>
          <label className="lastname">Last Name:<input type="text" placeholder="last name"></input></label>
          <br></br>
          <label className="contact-info">How can we contact you?</label>
          <br></br>
          <textarea type="text" placeholder="contact information"></textarea>
          <br></br>
          <div>Please rank the urgency of your situation on a scale of 1 through 5, where 1 is the least urgent, and 5 indicates that you are in immediate danger.
            <br></br>
            <label>1</label>
            <input type="radio" value="1"></input>
            <label>2</label>
            <input type="radio" value="2"></input>
            <label>3</label>
            <input type="radio" value="3"></input>
            <label>4</label>
            <input type="radio" value="4"></input>
            <label>5</label>
            <input type="radio" value="5"></input>
          </div>
          <br></br>
          <label className="message">Please provide any information about your situation that we may use to help you:</label>
          <br></br>
          <textarea type="text" placeholder="Additional information..."></textarea>
          <br></br>
        </div>

        <div className="user-status-main">
          <h5>Message Replies</h5>
        </div>

      </div>
    )
  }
}

export default Submission;