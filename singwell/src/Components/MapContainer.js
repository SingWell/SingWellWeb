import React, {Component} from 'react';

import {GoogleApiWrapper, Map, Marker} from 'google-maps-react'

class MapContainer extends Component {

    render () {

        return (
            <Map
                style={{width: "100%", height: "100%"}}
                google={this.props.google} zoom={16}
                initialCenter={this.props.initialCenter}>
                <Marker position={this.props.initialCenter}/>
            </Map>
        );
    }

}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDs9ev97Ko6vAon6w5wxflxhJBdcDhzXT0"
})(MapContainer);