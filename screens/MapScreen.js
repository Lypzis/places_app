import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = props => {
	const [markedLocation, setMarkedLocation] = useState();

	let mapRegion = {
		latitude: 37.78,
		longitude: -122.43,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	if (props.route.params !== undefined) {
		const { params } = props.route;
		mapRegion = {
			...mapRegion,
			latitude: params.lat,
			longitude: params.lng,
		};
	}

	const selectedLocation = event => {
		setMarkedLocation({
			latitude: event.nativeEvent.coordinate.latitude,
			longitude: event.nativeEvent.coordinate.longitude,
		});
	};

	return (
		<MapView style={styles.map} region={mapRegion} onPress={selectedLocation}>
			{markedLocation && (
				<Marker title='Picked Location' coordinate={{ ...markedLocation }} />
			)}
		</MapView>
	);
};

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
});

export default MapScreen;
