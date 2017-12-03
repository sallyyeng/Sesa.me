import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link} from 'react-router-dom';
import CharacterCarousel from './charCarousel.jsx';
import Submission from './submission.jsx'


class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }
  render() {
    return (
      <div>
        <div className="wrapperChar">
          <div className="boxChar headerChar">Create a Character</div>
          <div className="boxChar sidebarChar"><CharacterCarousel/></div>
          <div className="boxChar contentChar">
            <Submission username={this.props.username} sendMessage={this.props.sendMessage}/>
          </div>
          <div className="boxChar footerChar">Footer</div>
        </div>
      </div>
    );
  }
}

export default Character;
