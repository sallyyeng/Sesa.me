import React from 'react';
import ReactDOM from 'react-dom';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  //Render all open user messages in reverse chrono order
  //Nice to have: order by urgency
  render() {
    return (
      <div>
        <div className="message-created-at">{this.props.message.createdAt}</div>
        <div className="message-name">{this.props.message.first_name} {this.props.message.last_name}</div>
        <div className="message-urgency">Urgency: {this.props.message.user_urgency}</div>
        <div className="message-contact">Contact Information: {this.props.message.user_contact}</div>
        <div className="message-body">Message: {this.props.message.user_message}</div>
        <label className="message-complete">Case Complete<input type="checkbox"></input></label>
        <button className="admin-response-button">Respond to this message</button>
        <br></br>
      </div>
    );
  }
}

export default Message;
