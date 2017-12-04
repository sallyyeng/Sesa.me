import React, {Component} from 'react';
import socketIoClient from 'socket.io-client';
import UserAvailability from './UserAvailability.jsx';

class Userinfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
    }
  }
  
  componentWillMount() {
    var port = process.env.PORT || 3000;
    this.socket = socketIoClient(`http://localhost:${port}`);
    this.socket.emit('find:rooms')
    this.socket.on('update:rooms', (users) => {
      
      //for turning all statuses offline
      var userArr = this.state.users.slice();
      userArr.map((storedUser, index) => {
          storedUser.status = 'offline';
        })
      this.setState({users: userArr})
      
      //will add the new online users to the bottom of the list with online status
      for (var user in users) {
        userArr = this.state.users.slice();
        userArr.map((storedUser, index) => {
          if (storedUser[user]) {
            userArr.splice(index, 1);
          }
        })

        userArr.push({'username': user, 'room': users[user], 'status': 'online'});

        while (userArr.length > 5) {
          userArr.shift();
        }

        this.setState({users: userArr})
      }
    }) 

  }
  



  render(){
    return(
      <div>
        <ul>
          {this.state.users.map((user) => {
            return <UserAvailability key={user.username} username={user.username} room={user.room} status={user.status} changeRoom={this.props.changeRoom}/>
          })}
        </ul>
      </div>
    )
  }
}

export default Userinfo;
