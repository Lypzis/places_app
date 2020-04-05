import React, { useEffect } from 'react';
import { Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';

import PlaceItem from '../components/PlaceItem';
import { loadPlaces } from '../store/actions/places';

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

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadPlaces());
	}, [dispatch]);

	const places = useSelector(state => state.places.places);

	return (
		<FlatList
			data={places}
			renderItem={itemData => (
				<PlaceItem
					image={itemData.item.image}
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

export default PlacesListScreen;
