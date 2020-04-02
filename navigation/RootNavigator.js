import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import PlacesListScreen from '../screens/PlacesListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import MapScreen from '../screens/MapScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import Colors from '../constants/Colors';

const Stack = createStackNavigator();

const RootNavigator = props => (
	<Stack.Navigator
		screenOptions={{
			headerStyle: {
				backgroundColor: Platform.OS === 'android' ? Colors.primary : '#fff'
			},
			headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primary
		}}
	>
		<Stack.Screen
			name="PlacesListScreen"
			options={{ title: 'Places' }}
			component={PlacesListScreen}
		/>
		<Stack.Screen name="PlaceDetailScreen" component={PlaceDetailScreen} />
		<Stack.Screen name="MapScreen" component={MapScreen} />
		<Stack.Screen name="NewPlaceScreen" component={NewPlaceScreen} />
	</Stack.Navigator>
);

export default RootNavigator;
