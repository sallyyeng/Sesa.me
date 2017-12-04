import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import {Link} from 'react-router-dom';
import PacManBoard from './Board.jsx';
import P5Wrapper from 'react-p5-wrapper';

class PacMan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <a style={{position: "relative", float: "right"}} href="/">Logout</a>
        <P5Wrapper sketch={PacManBoard} />
      </div>
    )
  };
}

export default PacMan;
