import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link} from 'react-router-dom';
import $ from 'jquery';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import PageHeader from 'react-bootstrap/lib/PageHeader';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    console.log('inside handleLogout before ajax')
    // return new Promise((resolve, reject) => {
    $.ajax({
      method: 'GET',
      url: '/logout',
      contentType: 'application/json',
      success: (response) => {
        alert('You have successfully logged out');
        console.log('what does this return inside success ', response);
        history.push('/tommyandy');
        // resolve(response);
      },
      error: (err) => {
        console.log('failure inside handleLogout:', err);
        // reject(err);
      }
    });
    // });
  }

  render() {
    return (
      <a href="/">Logout</a>
    );
  }
}

export default Logout;
