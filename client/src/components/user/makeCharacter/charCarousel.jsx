import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link} from 'react-router-dom';
import Carousel from 'react-bootstrap/lib/Carousel';


class CharacterCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }
  render() {
    return (
      <div>
        <Carousel>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src="http://www.pngmart.com/files/2/Wonder-Woman-Transparent-Background.png" />
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src="http://img4.wikia.nocookie.net/__cb20130408003827/marveldatabase/images/7/79/Rogue_(Anna_Marie)_(Earth-12131)_001.png" />
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src="https://img00.deviantart.net/851d/i/2016/104/3/9/black_panther___transparent_background__by_camo_flauge-d9yv8wt.png" />
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default CharacterCarousel;
