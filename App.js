import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import RootNavigator from './navigation/RootNavigator';
import placesReducer from './store/reducers/places';

enableScreens();

const rootReducer = combineReducers({
	places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<RootNavigator />
			</NavigationContainer>
		</Provider>
	);
}
