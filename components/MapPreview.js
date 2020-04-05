import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const MapPreview = props => {
	let imagePreviewUrl;

	if (props.location)
		imagePreviewUrl = `
    https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=kV7BzZtN7vQYhq_BF4oR3fzN6T0J_47v1zv-ZBvOCm8&lat=52.518752&lon=13.402277&vt=0&z=14
    `;

	return (
		<View style={{ ...styles.mapPreview, ...props.style }}>
			{props.location ? (
				<Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
			) : (
				props.children
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	mapPreview: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	mapImage: {
		width: '100%',
		height: '100%',
	},
});

export default MapPreview;
