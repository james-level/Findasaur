import React from "react";
import { Marker } from "react-google-maps";
import MapPin from "../assets/icons/mappin.png";

export default class DinoMarker extends React.Component {

  render(){
    return(
        <Marker
          position={this.props.location}
          icon={MapPin}
        >
        </Marker>
    );
  }
}
