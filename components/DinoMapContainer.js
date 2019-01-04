import React from "react";
import DoctorsMap from "../components/DinosMap";

export default class DinosMapContainer extends React.Component {

	render() {
		return (
			<DinosMap
				dinos={this.props.dinos}
				googleMapURL={`https://maps.googleapis.com/maps/api/js?key=353b48baf84f775d952262df4405f7f9&v=3.exp&libraries=geometry,drawing,places`}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `600px`, width: `600px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		);
	}
