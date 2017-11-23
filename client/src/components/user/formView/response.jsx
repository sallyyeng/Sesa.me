import React from 'react';
import ReactDOM from 'react-dom';

class Response extends React.Component {
  constructor(props) {
    super(props);
  }

  //Render all admin responses for this user in reverse chronological order of original message submission date
  render() {
    return (
      <div>
        <div className="message-created-at">{this.props.response.updatedAt}</div>
        <div className="message-response">{this.props.response.admin_response}</div>
      </div>
    );
  }
}

export default Response;
