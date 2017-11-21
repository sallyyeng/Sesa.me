import React from 'react';
import ReactDOM from 'react-dom';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="message-created-at">{this.props.response.createdAt}</div>
        <div className="message-response">{this.props.response.admin_response}</div>
      </div>
    );
  }
}

export default Message;
