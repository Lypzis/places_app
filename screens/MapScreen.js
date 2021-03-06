import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	Platform,
	TouchableNativeFeedback,
	View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from '../constants/Colors';

const Touch =
	Platform.OS === 'android' && Platform.Version > 21
		? TouchableNativeFeedback
		: TouchableOpacity;

const MapScreen = props => {
	const { params } = props.route;

	props.navigation.setOptions({
		headerRight: () => {
			if (params !== undefined && params.readOnly) return null;

			return (
				<Touch onPress={savePickedLocationHandler}>
					<View style={styles.headerButton}>
						<Text style={styles.headerButtonText}>Save</Text>
					</View>
				</Touch>
			);
		},
	});

	const [markedLocation, setMarkedLocation] = useState();

	let mapRegion = {
		latitude: 37.78,
		longitude: -122.43,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	if (params !== undefined) {
		mapRegion = {
			...mapRegion,
			latitude: params.lat,
			longitude: params.lng,
		};
	}

	useEffect(() => {
		const setPredefinedLocation = () => {
			setMarkedLocation({
				latitude: params.lat,
				longitude: params.lng,
			});
		};

		if (params !== undefined) setPredefinedLocation();
	}, []);

	const selectedLocation = event => {
		if (params !== undefined && params.readOnly) return;

		setMarkedLocation({
			latitude: event.nativeEvent.coordinate.latitude,
			longitude: event.nativeEvent.coordinate.longitude,
		});
	};

	const savePickedLocationHandler = () => {
		if (!markedLocation) return; // perhaps show an alert

		props.navigation.navigate('NewPlaceScreen', markedLocation);
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
	headerButton: {
		marginHorizontal: 20,
		padding: 5,
		borderRadius: 3,
	},
	headerButtonText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: Platform.OS === 'android' ? '#fff' : Colors.primary,
	},
});

export default MapScreen;
