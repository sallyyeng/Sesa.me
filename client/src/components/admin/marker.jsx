import React, {Component} from 'react';
const {
  Marker,
  InfoWindow,
} = require("react-google-maps");


class MarkerItem extends Component{
  constructor(props){
    super(props);
    this.state={isOpen: false}
  }
  render() {
    return (
      <Marker
        icon={this.props.location.icon}
        position={{lat: this.props.location.lat, lng: this.props.location.lng}}
        onClick={()=> this.setState({isOpen: !this.state.isOpen})}>
        {this.state.isOpen && <InfoWindow onCloseClick={()=> this.setState({isOpen: !this.state.isOpen})}>
          <h1>{this.props.location.info}</h1>
        </InfoWindow>}
      </Marker>
    )
  }
};

export default MarkerItem;
