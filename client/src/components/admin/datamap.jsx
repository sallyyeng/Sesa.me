import React from 'react';
const { compose, withProps } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  FusionTablesLayer,
} = require("react-google-maps");





//data source: the SF police department, from data.sfgov.org
const DataMap = (props)=> {
  const MapWithAFusionTablesLayer = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )(props =>
    <GoogleMap
      defaultZoom={11}
      defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
    >
      <FusionTablesLayer
        options={{
          query: {
            select: 'geometry',
            from: '11u0uCw4UtWYJUfvNlZwhgou7485_pT_RvMKaxnzV'
          }
        }}
      />
    </GoogleMap>
  );
  return(<MapWithAFusionTablesLayer/>);
};




export default DataMap;
