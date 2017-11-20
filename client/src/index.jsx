import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/user/tictactoeView/game.jsx';

class App extends React.Component {
//   constructor(props) {
//     super(props);

// // this.state = {}
//   }; 

render() {
  return (
    <div>
    <Game/>

    </div>






  )
}






} 
  
ReactDOM.render(<App/>, document.getElementById('app'));