import React from 'react';
import ReactDOM from 'react-dom';
import Message from './message.jsx'

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //example data for mocking
      messages: [
        {
          id: 1,
          createdAt: '10/20/2017',
          first_name: 'Jane',
          last_name: 'Smith',
          user_message: 'Test message',
          user_contact: 'Test contact info',
          user_urgency: '3'
        },
        {
          id: 2,
          createdAt: '10/19/2017',
          first_name: 'Lady',
          last_name: 'Person',
          user_message: 'Test message 2',
          user_contact: 'Test contact info 2',
          user_urgency: '1'
        }
      ]
    }
  }

  componentDidMount() {
    this.props.retrieveOpenMessages( (data) => {
      this.setState({
        //may have to change 'data' depending on format
        messages: data
      });
    });
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
          <ul>
            {this.state.messages.map( (message, index) => {
              return <Message key={index} message={message}/>
            })}
          </ul>
        </div>

      </div>
    )
  }
}

export default AdminView;