import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Game from './components/user/tictactoeView/game.jsx';
import Login from './components/user/formView/login.jsx';
import Signup from './components/user/formView/signup.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  //MAKE SURE THIS INTERACTS CORRECTLY WITH SERVER/DB
  //On successful user creation, should redirect to login page
  //On failed user creation (ie: user already in use), should redirect to create user page with descriptive error message
  createUser(username, password, admin) {
    console.log(` ${username}, ${password}, ${admin} posted to server`);
    $.ajax({
      method: 'POST',
      url: '/signup',
      data: {
        username: username,
        password: password,
        admin: admin
      },
      success: (data) => {
        console.log(success);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  logInUser(username, password) {
    console.log(`${username}, ${password} posted to server`);
    $.ajax({
      method: 'POST',
      url: '/login',
      data: {
        username: username,
        password: password
      },
      success: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  render() {
    return (
      <div>
      <Game/>
      <Login logInUser={this.logInUser.bind(this)}/>
      <Signup createUser={this.createUser.bind(this)}/>
      </div>
    )
  }

} 
  
ReactDOM.render(<App/>, document.getElementById('app'));