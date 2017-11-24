import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';


class Response extends React.Component {
  constructor(props) {
    super(props);
  }

  //Render all admin responses for this user in reverse chronological order of original message submission date
  render() {
    return (
      <div className="admin-response-container group">
        <div className="response-contents group">
          <span className="message-created-at">Created: </span><p>{this.props.response.updatedAt}</p>
          <br></br>
          <span className="message-body">Your original message: </span><p>{this.props.response.user_message}</p>
          <br></br>
          <span className="response-body">Response: </span><p>{this.props.response.admin_response}</p>
        </div>
        <div className="response-actions group">
          <Button bsSize="small" bsStyle="primary" onClick={this.props.showSubmissionForm}>Respond to Message</Button>
        </div>
      </div>
    );
  }
}

export default Response;
