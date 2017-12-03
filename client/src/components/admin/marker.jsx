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
   const name = this.props.location.name ? this.props.location.name : 'user';
   console.log(name);
    return (
      <Marker
        icon={this.props.location.icon.url}
        position={{lat: this.props.location.lat, lng: this.props.location.lng}}
        onClick={()=> this.setState({isOpen: !this.state.isOpen})}>
        {this.state.isOpen && <InfoWindow onCloseClick={()=> this.setState({isOpen: !this.state.isOpen})}>
          <p><b>{name}</b> : {this.props.location.address}</p>
        </InfoWindow>}
      </Marker>
    )
  }
}

export default MarkerItem;
