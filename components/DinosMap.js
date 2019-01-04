import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import DinoMarker from "./DinoMarker";

const DinosMap = withScriptjs(withGoogleMap((props) =>{

  const markers = props.dinos.map( dino => <DinoMarker
                    key={dino.uid}
                    dino={dino}
                    location={{lat:21.289373 , lng:-157.917480}} //NB: Hard coded: Hawaii
                  />);

  return (
      <GoogleMap
        defaultZoom={14}
        center={ { lat:  42.3601, lng: -71.0589 } }
        >
        {markers}
      </GoogleMap>
    );
  }
))

export default DinosMap;
