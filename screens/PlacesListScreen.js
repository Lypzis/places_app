import React from 'react';
import { StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector } from 'react-redux';

import PlaceItem from '../components/PlaceItem';

const PlacesListScreen = props => {
	props.navigation.setOptions({
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Add Place'
					iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
					onPress={() => props.navigation.navigate('NewPlaceScreen')}
				/>
			</HeaderButtons>
		),
	});

	const places = useSelector(state => state.places.places);

	return (
		<FlatList
			data={places}
			renderItem={itemData => (
				<PlaceItem
					image={null}
					title={itemData.item.title}
					address={null}
					onSelect={() =>
						props.navigation.navigate('PlaceDetailScreen', {
							title: itemData.item.title,
							id: itemData.item.id,
						})
					}
				/>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default PlacesListScreen;
