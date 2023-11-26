


import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
const AnyReactComponent = ({ text }) => <div>{  text}</div>;
const Map = () => {
    const defaultProps = {
        center: {
          lat: 23.7435,
          lng: 90.3846
        },
        zoom: 15
      };
    return (
        <div  style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={defaultProps.center.lat}
            lng={defaultProps.center.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
};
AnyReactComponent.propTypes={
   text:PropTypes.node
}
export default Map;