import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import $ from 'jquery';
import Chat from './chat.jsx';
import Info from './info.jsx';
import Map from './map.jsx';

//location: '', lat: '', long:''
class SocialServicesMap extends Component{
  constructor(props){
    super(props);
    this.state = {arr: []};
  }
  componentDidMount(){

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const success = (pos)=> {
      const crd = pos.coords;
      const url = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${crd.latitude},${crd.longitude}&sensor=true`;
      $.ajax({
        url: url,
        type: "GET",
        success: response=>{
          const lat = crd.latitude;
          const long = crd.longitude;
          const location = response.results[0]['formatted_address'];
          this.setState({location});
          this.setState({lat});
          this.setState({long});
        }
      });
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

  }

  render(){
    return(
      <div className="wrapperAdmin">
        <div className="boxAdmin headerAdmin">
          Dashboard

        </div>
        <div className="boxAdmin sidebarAdmin">
          Users
        </div>
        <div className="boxAdmin contentAdmin">
          <Map geolocationInfo={this.state}/>
          <br /> More content than we had before so this column is now quite tall.</div>
        <div className="boxAdmin footerAdmin">
          <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
            <Tab eventKey={1} title="Chat">
              <Chat/>
            </Tab>
            <Tab eventKey={2} title="Info">
              <Info/>
            </Tab>
          </Tabs>
        </div>
      </div>

    )
  }





}


export default SocialServicesMap;
