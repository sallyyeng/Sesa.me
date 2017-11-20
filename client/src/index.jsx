import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/user/tictactoeView/game.jsx';
import Login from './components/user/formView/login.jsx';
import Signup from './components/user/formView/signup.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  createUser(username, password, admin) {
    console.log(username, password, admin);
  }

  render() {
    return (
      <div>
      <Game/>
      <Login/>
      <Signup createUser={this.createUser.bind(this)}/>
      </div>
    )
  }

} 
  
ReactDOM.render(<App/>, document.getElementById('app'));