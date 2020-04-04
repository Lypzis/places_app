import React from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

const ImgPicker = props => {
	const verifyPermissions = async () => {
		// The permission is required for iOS and some versions android, so always use it in case
		const res = await Permissions.askAsync(
			Permissions.CAMERA,
			Permissions.CAMERA_ROLL
		);

		if (res.status !== 'granted') {
			Alert.alert(
				'Insuficient Permissions!',
				'You need to grant camera permissions in order to use this app.',
				[{ text: 'ok' }]
			);
			return false;
		}

		return true;
	};

	const takeImageHandler = async () => {
		const hasPermission = await verifyPermissions();

		if (!hasPermission) return; // will only open camera if permission was granted

		ImagePicker.launchCameraAsync();
	};

	return (
		<View style={styles.imagePicker}>
			<View style={styles.imagePreview}>
				<Text>No image picked yet.</Text>
				<Image style={styles.image} />
			</View>
			<Button
				title='Take Image'
				color={Colors.primary}
				onPress={takeImageHandler}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	imagePicker: {
		alignItems: 'center',
	},
	imagePreview: {
		width: '100%',
		height: 200,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#ccc',
		borderWidth: 1,
	},
	image: {
		width: '100%',
		height: '100%',
	},
});

export default ImgPicker;
