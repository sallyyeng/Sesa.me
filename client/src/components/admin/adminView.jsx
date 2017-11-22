import React from 'react';
import ReactDOM from 'react-dom';
import Message from './message.jsx';

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
      ],
      messageId: null,
      response: ''    
    }
  }

  componentWillReceiveProps() {
    this.props.retrieveOpenMessages( (data) => {
      console.log('ADMIN MESSAGES', data);
      this.setState({
        //may have to change 'data' depending on format
        messages: data
      });
    });
  }

  //sets state variable messageId to currently selected message's id
  setResponseId(id) {
    this.setState({
      messageId: id
    });
  }

  //when admin types a response, updates state variable response
  updateResponse(e) {
    this.setState({
      response: e.target.value
    });
  }

  //when admin submits a response, calls the submitAdminResponse method to send id and response to server as a patch request
  sendResponse() {
    this.props.submitAdminResponse(this.state.messageId, this.state.response);
  }

  //calls the markAsComplete method in index.jsx to send id and status to server
  setStatus(id) {
    this.props.markAsComplete(id);
  }


  render() {
    return (
      <div>
        <div>Admin View: This will be rendered conditionally</div>
        <div className="admin-response-main">
          <h5>New Response</h5>
          <label className="message">Respond to message:</label>
          <br></br>
          <textarea onChange={this.updateResponse.bind(this)} type="text" placeholder="Response..."></textarea>
          <br></br>
          <button onClick={this.sendResponse.bind(this)}>Submit Response</button>
        </div>

        <div className="admin-inbox-main">
          <h5>Inbox</h5>
          <ul>
            {this.state.messages.map( (message, index) => {
              return <Message setStatus={this.setStatus.bind(this)} setResponseId={this.setResponseId.bind(this)} key={index} message={message}/>
            })}
          </ul>
        </div>

      </div>
    )
  }
}

export default AdminView;