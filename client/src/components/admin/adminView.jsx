import React from 'react';
import ReactDOM from 'react-dom';

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageUsername: ''
    }
  }

  render() {
    return (
      <div>
        <div>Admin View: This will be rendered conditionally</div>
        <div className="admin-response-main">
          <h5>New Message</h5>
          <label className="message">Respond to message:</label>
          <br></br>
          <textarea type="text" placeholder="Response..."></textarea>
          <br></br>
        </div>

        <div className="admin-inbox-main">
          <h5>Inbox</h5>
        </div>

      </div>
    )
  }
}

export default AdminView;