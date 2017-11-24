import React from 'react';
import ReactDOM from 'react-dom';
import Response from './response.jsx';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';


class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageId: this.props.message.id,
      messageName: this.props.message.first_name + ' ' + this.props.message.last_name,
      showResponseForm: false
    }
  }

  // Call initiateResponse in adminView with this message's id
  //Nice to have: indicate which response is being responded to
  onRespondClick() {
    this.props.setResponseId(this.state.messageId);
    this.setState({
      showResponseForm: !this.state.showResponseForm
    });
  }

  onCompleteCheck() {
    this.props.setStatus(this.state.messageId);
  }

  //Render all open user messages in reverse chrono order
  //Nice to have: order by urgency
  render() {
    if (this.state.showResponseForm) {
      return (
        <div className="user-message-container group">
          <div className="message-contents group">
            <span className="message-created-at">Created: </span><p>{this.props.message.createdAt}</p>
            <br></br>
            <span className="message-name">Name: </span><p>{this.props.message.first_name} {this.props.message.last_name}</p>
            <br></br>
            <span className="message-urgency">Urgency: </span><p>{this.props.message.user_urgency}</p>
            <br></br>
            <span className="message-contact">Contact Information: </span><p>{this.props.message.user_contact}</p>
            <br></br>
            <span className="message-body">Message: </span><p>{this.props.message.user_message}</p>
          </div>
          <div className="message-actions group">
            <Checkbox onClick={this.onCompleteCheck.bind(this)} type="checkbox">Case Complete</Checkbox>
            <Button bsStyle="primary" onClick={this.onRespondClick.bind(this)} className="admin-response-button">Hide Response Form</Button>
          </div>
          <div className="message-response group">
            <Response messageName={this.state.messageName} messageId={this.state.messageId} submitAdminResponse={this.props.submitAdminResponse}/>
          </div>
        </div>
      );
    } else { 
      return (
        <div className="user-message-container group">
          <div className="message-contents group">
            <span className="message-created-at">Created: </span><p>{this.props.message.createdAt}</p>
            <br></br>
            <span className="message-name">Name: </span><p>{this.props.message.first_name} {this.props.message.last_name}</p>
            <br></br>
            <span className="message-urgency">Urgency: </span><p>{this.props.message.user_urgency}</p>
            <br></br>
            <span className="message-contact">Contact Information: </span><p>{this.props.message.user_contact}</p>
            <br></br>
            <span className="message-body">Message: </span><p>{this.props.message.user_message}</p>
          </div>
          <div className="message-actions group">
            <Checkbox onClick={this.onCompleteCheck.bind(this)} type="checkbox">Case Complete</Checkbox>
            <Button bsStyle="primary" onClick={this.onRespondClick.bind(this)} className="admin-response-button">Show Response Form</Button>
          </div>
        </div>
      );
    }
  }
}

export default Message;
