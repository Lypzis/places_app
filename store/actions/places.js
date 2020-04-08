import * as FileSystem from 'expo-file-system';

import { insertPlace, fetchPlaces } from '../../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image, location) => {
	return async dispatch => {
		// splits by '/' into an array and gets the
		// last element from pop, which is the file name
		const fileName = image.split('/').pop();

		const newPath = `${FileSystem.documentDirectory}/${fileName}`;

		try {
			const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?
			latitude=${location.latitude}&
			longitude=${location.longitude}&
			localityLanguage=en`);

			if (!res.ok) throw new Error('Something went wrong!');

			const resData = await res.json();

			const address = `${resData.locality}, ${resData.localityInfo.administrative[6].name}, ${resData.principalSubdivision}-${resData.countryCode}`;

			await FileSystem.moveAsync({
				from: image,
				to: newPath,
			});

			const dbResult = await insertPlace(
				title,
				newPath,
				address,
				location.latitude,
				location.longitude
			);

			dispatch({
				type: ADD_PLACE,
				placeData: {
					id: dbResult.insertId,
					title: title,
					image: newPath,
					address: address,
					coords: {
						lat: location.latitude,
						lng: location.longitude,
					},
				},
			});
		} catch (err) {
			throw err;
		}
	};
};

export const loadPlaces = () => {
	return async dispatch => {
		try {
			const dbResult = await fetchPlaces();

			dispatch({ type: SET_PLACES, places: dbResult.rows._array });
		} catch (err) {
			throw err;
		}
	};
};
