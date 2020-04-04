import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceDetailScreen = props => {
	const { params } = props.route;

	console.log(params);

	props.navigation.setOptions({
		headerTitle: params.title,
	});

	return (
		<View style={styles.screen}>
			<Text>PlaceDetailScreen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default PlaceDetailScreen;
