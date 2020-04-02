import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import RootNavigator from './navigation/RootNavigator';

export default function App() {
	return (
		<NavigationContainer>
			<RootNavigator />
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
