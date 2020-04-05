import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

const ImgPicker = props => {
	const [pickedImage, setPickedImage] = useState();

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

		const image = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		});

		setPickedImage(image.uri);
		props.onImageTaken(image.uri); // this is the right way of passing something from a child to parent
	};

	return (
		<View style={styles.imagePicker}>
			<View style={styles.imagePreview}>
				{!pickedImage ? (
					<Text>No image picked yet.</Text>
				) : (
					<Image style={styles.image} source={{ uri: pickedImage }} />
				)}
			</View>
			<View style={styles.buttonBox}>
				<Button
					title='Take Picture'
					color={Colors.primary}
					onPress={takeImageHandler}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	imagePicker: {
		alignItems: 'center',
		marginBottom: 15,
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
	buttonBox: {
		width: '100%',
	},
});

export default ImgPicker;
