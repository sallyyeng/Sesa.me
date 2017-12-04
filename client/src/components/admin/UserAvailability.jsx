import React, {Component} from 'react';
import socketIoClient from 'socket.io-client';
import Image from 'react-bootstrap/lib/Image';

class UserAvailability extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.changeRoom(this.props.room);
  }

    render() {
      let availabilityIndicator = null;
      if(this.props.status === 'online') {
        availabilityIndicator = <div className="availabilityIndicator"><div id="greenDot"></div><div className="availabilityStatus">Online</div></div>
      } else {
        availabilityIndicator = <div className="availabilityIndicator"><div id="redDot"></div><div className="availabilityStatus">Offline</div></div>
      }

      return (
        <li key={this.props.username} className='onlineStatus' onClick={this.handleClick} room={this.props.room}>
           <Image className='statusThumbnail' src='http://placecorgi.com/250' circle/>
           <div className='statusName'>{this.props.username}</div>
           {availabilityIndicator}
        </li>
      )}

  }

  export default UserAvailability;