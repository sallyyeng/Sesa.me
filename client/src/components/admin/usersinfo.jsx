import React, {Component} from 'react';
import socketIoClient from 'socket.io-client';
import Image from 'react-bootstrap/lib/Image';
import UserAvailability from './userAvailability.jsx'

class Userinfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
    }
    this.handleClick = this.handleClick.bind(this);
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
      console.log('USERS', JSON.stringify(this.state.users))
    }) 

  }
  
  handleClick(event) {
    event.preventDefault();
    
  }


  render(){
    

    return(
      <div>
      <ul>
        {this.state.users.map((user) => {
          return <UserAvailability key={user.username} username={user.username} status={user.status} onClick={this.handleClick}/>
        })}
      </ul>
      <div>user info...</div>
      </div>
    )
  }
}

export default Userinfo;

//line up all the users, so I need to grab the room data
//devide the room data into components that each have data

//latest ones to sign on will get to be higher on the list, 
//list maxes out at 10, scroll bar available
//tells if the users are online
//so the array will update, each item needs an on or off prop