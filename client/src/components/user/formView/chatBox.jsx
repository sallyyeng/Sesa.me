import React from 'react';
import ReactDom from 'react-dom';
import socketIoClient from 'socket.io-client';
import ScrollList from 'react-scrollable-list';


class ChatBox extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      clientMessage: '',
      messageLog: [],
      username: this.props.username,
      roomname: this.props.roomname,
    }
    this.socket;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    var port = process.env.PORT || 3001;
    this.socket = socketIoClient(`http://localhost:${port}`);
    var userData = {
      username: this.props.username,
      roomname: this.props.roomname,
    }
    this.socket.emit('join:room', userData);
    this.socket.on('update:chat', (msg) => {
      var newMessageArr = this.state.messageLog.slice();
      newMessageArr.splice(0,0,msg);
      // newMessageArr.push(msg);
      this.setState({messageLog: newMessageArr});
      console.log('Into the messages');
    });
  }
  
  componentWillUnmount() {
    socket.leave(`${this.state.username}`)
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
        <ScrollList listItems={this.state.messageLog} heightOfItems={5} />
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

  // <ul className="messageLog">
  //         {this.state.messageLog.map((msg, index) => {
  //           return <li key={index} className="messageBubble">{`${msg.username}: ${msg.message}`}</li>
  //         })}
  //       </ul>
