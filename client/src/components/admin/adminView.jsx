import React from 'react';
import ReactDOM from 'react-dom';
import Message from './message.jsx';
import Response from './response.jsx';

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

  componentDidMount() {
    this.props.retrieveOpenMessages( (data) => {
      console.log('ADMIN MESSAGES', data);
      this.setState({
        //may have to change 'data' depending on format
        messages: data
      });
    });
  }

  // componentWillReceiveProps() {
  //   this.props.retrieveOpenMessages( (data) => {
  //     console.log('ADMIN MESSAGES', data);
  //     this.setState({
  //       //may have to change 'data' depending on format
  //       messages: data
  //     });
  //   });
  // }

  //sets state variable messageId to currently selected message's id
  setResponseId(id) {
    this.setState({
      messageId: id
    });
  }

  //calls the markAsComplete method in index.jsx to send id and status to server
  setStatus(id) {
    this.props.markAsComplete(id);
  }


  render() {
    return (
      <div>
        <div className="admin-header">
          <h3>Welcome to the admin command center!</h3>
          <h4>You can view and respond to user messages here.</h4>
        </div>
        
        <ul className="user-message-ul">
          {this.state.messages.map( (message, index) => {
            return <Message setStatus={this.setStatus.bind(this)} setResponseId={this.setResponseId.bind(this)} key={index} message={message}/>
          })}
        </ul>

        <Response className="group"/>
      
      </div>
    )
  }
}

export default AdminView;