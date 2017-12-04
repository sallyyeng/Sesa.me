import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import $ from 'jquery';
import Info from './info.jsx';
import Map from './map.jsx';
import DataMap from './datamap.jsx';
import ChatBox from '../user/formView/chatBox.jsx';
import Users from './usersinfo.jsx';

//this.props.lat, long, location


//location: '', lat: '', long:''
class SocialServicesMap extends Component{
  constructor(props){
    super(props);
    this.state = {resArr: [], location:null,lat: null, long: null};
  }
  componentWillMount(){
    const lat = this.props.lat;
    const long = this.props.long;
    const location = this.props.location;
          $.ajax({
            url: '/location',
            data: {lat, long},
            type: "GET",
            success: resArr=>{
              console.log("RESPONSE... ");
             console.log(resArr);
             this.setState({resArr, location, lat, long});
            }
          });
  }


  render(){
    return(
      <div className="wrapperAdmin">
        <div className="boxAdmin headerAdmin">
          Dashboard

        </div>
        <div className="boxAdmin sidebarAdmin">
          <Users />
        </div>
        <div className="boxAdmin contentAdmin">
          <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
            <Tab eventKey={1} title="User Map">
              {this.state.resArr.length > 0 ?
                <Map geolocationInfo={this.state}/>:
                <h1>Loading, please wait...</h1>
              }
            </Tab>
            <Tab eventKey={2} title="Data Map">
                <DataMap/>
            </Tab>
          </Tabs>
          <br /> More content than we had before so this column is now quite tall.</div>
        <div className="boxAdmin footerAdmin">
          <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
            <Tab eventKey={1} title="Chat">
              <ChatBox username={this.props.username} roomname={this.props.roomname} />
            </Tab>
            <Tab eventKey={2} title="Info">
              {/*<Info*/}
                {/*userData={this.props.userData}*/}
              {/*/>*/}
            </Tab>
          </Tabs>
        </div>
      </div>
    )

  }





}


export default SocialServicesMap;
