import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Game from './components/user/tictactoeView/game.jsx';
import Login from './components/user/formView/login.jsx';
import Signup from './components/user/formView/signup.jsx';
import Submission from './components/user/formView/submission.jsx';
import AdminView from './components/admin/adminView.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      type: '',
      showForms: false,
      //Possible view values:
        // restricted: only render game
        // unrestricted: render game, login and signup buttons (after user has clicked button 10x)
        // login: render login component (if user clicks on login button)
        // signup: render signup component (if user clicks on signup button OR creates an account, will be redirected)
        // submissions: render sumbissions component (if user is successfully logged in)
      view: 'restricted',
      showBugButton: false
    }

    this.unlockForms = this.unlockForms.bind(this);
  }

  //MAKE SURE THIS INTERACTS CORRECTLY WITH SERVER/DB

  createUser(username, hash, admin) {
    console.log(` ${username}, ${hash}, ${admin} posted to server`);
    $.ajax({
      method: 'POST',
      url: '/signup',
      data: {
        username: username,
        hash: hash,
        admin: admin
      },
      success: (data) => {
        console.log('success');
        this.setState({
          view: 'login'
        });
      },
      error: (error) => {
        console.log(error);
        alert('Woops, looks like that username is already taken!');
        this.setState({
          view: 'signUp'
        });
      }
    });
  }

  logInUser(username, hash) {
    console.log(`${username}, ${hash} posted to server`);
    $.ajax({
      method: 'POST',
      url: '/login',
      data: {
        username: username,
        hash: hash
      },
      success: (data) => {
        console.log(data);
        this.setState({
          view: 'submissions',
          // should this recieve data from db to set state values for type (admin?) and username???
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  sendMessage(username, first, last, contact, urgency, message) {
    console.log(`${username}, ${first}, ${last}, ${contact}, ${urgency}, ${message} requested post to server as new message`);
    $.ajax({
      method: 'POST',
      url: '/submissions',
      data: {
        username: username,
        first_name: first,
        last_name: last,
        user_contact: contact,
        user_urgency: urgency,
        user_message: message
      },
      success: (data) => {
        console.log(data);
        alert('Your message was sent succesfully. Check back often for status updates.');
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  retrieveResponses(username, callback) {
    console.log(`in retrieveResponses with ${username}`);
    $.ajax({
      method: 'GET',
      url: '/submissions',
      data: {
        username: username
      },
      success: (data) => {
        console.log(data);
        callback(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  showLogIn() {
    this.setState({
      view: 'login'
    });
  }

  showSignUp() {
    this.setState({
      view: 'signup'
    });
  }

  unlockForms(){
    this.setState({showBugButton: true});
  }

  render() {
    if (this.state.showBugButton === true) {
      return <div>
        <Game/>
        <p>It looks like you've found a bug.  Would you like to report it?</p>
        <button>yes</button>
        <button>no</button>
      </div>;

    } 

    return (
      <div>
        <Game unlockForms={this.unlockForms}/>
        
        <button onClick={this.showLogIn.bind(this)}>Log In</button>
        <button onClick={this.showSignUp.bind(this)}>Sign Up</button>
        <Login logInUser={this.logInUser.bind(this)}/>
        <Signup createUser={this.createUser.bind(this)}/>
        <Submission username={this.state.username} sendMessage={this.sendMessage.bind(this)} retrieveResponses={this.retrieveResponses.bind(this)}/>
        <AdminView/>
      </div>
    )
  }

} 
  
ReactDOM.render(<App/>, document.getElementById('app'));