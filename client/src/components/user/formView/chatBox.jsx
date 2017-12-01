import React from 'react';
import ReactDom from 'react-dom';
import socketIoClient from 'socket.io-client';


class ChatBox extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      clientMessage: '',
      messageLog: [],
      username: "admin",
    }
    this.socket;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    this.socket = socketIoClient('http://localhost:4200');
    this.socket.on('send:message', (msg) => {
      var newMessageArr = this.state.messageLog.slice();
      newMessageArr.push(msg);
      this.setState({messageLog: newMessageArr});
      console.log('Into the messages');
    });
  }
  
  componentWillUnmount() {
    socket.disconnect();
  }
  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    //socket call
    this.socket.emit('send:message', {
      username: this.state.username,
      message: this.state[event.target.name],
    })
    event.preventDefault();
    this.setState({clientMessage: ''})
  }
  
  render() {
    return ( 
      <div className="chat-log" >
        <ul className="messageLog">
          {this.state.messageLog.map((msg, index) => {
            return <li key={index} className="messageBubble">{`${msg.username}: ${msg.message}`}</li>
          })}
        </ul>
          <form className="chat-entry-form" action="" name="clientMessage" onSubmit={this.handleSubmit}>
            <input id="message" name="clientMessage" type="text" value={this.state.clientMessage} onChange={this.handleChange} placeholder="Enter Message Here"/>
            <input type="submit" value="Send"/>
          </form>
      </div>
    );
  }
};

module.exports = ChatBox;

//autocomplete="off"


