import React, { useState } from 'react';
import {
	View,
	Button,
	Text,
	ActivityIndicator,
	Alert,
	StyleSheet,
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = props => {
	const [isFetching, setIsFetching] = useState(false);
	const [pickedLocation, setPickedLocation] = useState();

	const verifyPermissions = async () => {
		// The permission is required for iOS and some versions android, so always use it in case
		const res = await Permissions.askAsync(Permissions.LOCATION);

		if (res.status !== 'granted') {
			Alert.alert(
				'Insuficient Permissions!',
				'You need to grant location permission in order to use this app.',
				[{ text: 'ok' }]
			);
			return false;
		}

		return true;
	};

	const getLocationHandler = async () => {
		try {
			setIsFetching(true);
			const hasPermission = await verifyPermissions();

			if (!hasPermission) return;

			const location = await Location.getCurrentPositionAsync({
				timeout: 5000,
			});

			console.log(location);
			setPickedLocation({
				lat: location.coords.latitude,
				lng: location.coords.longitude,
			});
			props.onLocationSelected(location);
			setIsFetching(false);
		} catch (err) {
			setIsFetching(false);
			Alert.alert(
				'Could not fetch location!',
				'Please try again later or pick a location on the map.',
				[{ text: 'ok' }]
			);
			throw err;
		}
	};

	return (
		<View style={styles.locationPicker}>
			<MapPreview style={styles.mapPreview} location={pickedLocation}>
				{isFetching ? (
					<ActivityIndicator size='large' color={Colors.primary} />
				) : (
					<Text>No location chonsen yet!</Text>
				)}
			</MapPreview>
			<Button
				title='Get User Location'
				color={Colors.primary}
				onPress={getLocationHandler}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	locationPicker: {
		marginBottom: 15,
	},
	mapPreview: {
		marginBottom: 10,
		width: '100%',
		height: 150,
		borderColor: '#ccc',
		borderWidth: 1,
	},
});

export default LocationPicker;