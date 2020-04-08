import React, { useState, useCallback } from 'react';
import {
	ScrollView,
	Button,
	View,
	Text,
	TextInput,
	StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import { addPlace } from '../store/actions/places';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = props => {
	const [titleValue, setTitleValue] = useState('');
	const [selectedImage, setSelectedImage] = useState();
	const [selectedLocation, setSelectedLocation] = useState();

	const dispatch = useDispatch();

	const titleChangeHandler = text => {
		// validation?
		setTitleValue(text);
	};

	const savePlaceHandler = () => {
		dispatch(addPlace(titleValue, selectedImage, selectedLocation));
		props.navigation.goBack();
	};

	const onImageTakenHandler = imageUri => {
		setSelectedImage(imageUri);
	};

	const onLocationSelectedHandler = useCallback(location => {
		setSelectedLocation(location);
	}, []);

	return (
		<ScrollView>
			<View style={styles.form}>
				<Text style={styles.label}>Title</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={titleChangeHandler}
					value={titleValue}
				/>
				<ImagePicker onImageTaken={onImageTakenHandler} />
				<LocationPicker
					{...props}
					onLocationSelected={onLocationSelectedHandler}
				/>
				<Button
					title='Save Place'
					color={Colors.primary}
					onPress={savePlaceHandler}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	form: {
		margin: 30,
	},
	label: {
		fontSize: 18,
		marginBottom: 15,
	},
	textInput: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		marginBottom: 15,
		paddingVertical: 4,
		paddingHorizontal: 2,
	},
});

export default NewPlaceScreen;
