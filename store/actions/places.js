import * as FileSystem from 'expo-file-system';

import { insertPlace, fetchPlaces } from '../../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image) => {
	return async dispatch => {
		// splits by '/' into an array and gets the
		// last element from pop, which is the file name
		const fileName = image.split('/').pop();

		const newPath = `${FileSystem.documentDirectory}/${fileName}`;

		try {
			// moves from the temporary path
			// to a persistent path
			await FileSystem.moveAsync({
				from: image,
				to: newPath,
			});

			const dbResult = await insertPlace(
				title,
				newPath,
				'Dummy address',
				15.6,
				12.3
			);

			dispatch({
				type: ADD_PLACE,
				placeData: { id: dbResult.insertId, title: title, image: newPath },
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

			console.log(dbResult);

			dispatch({ type: SET_PLACES, places: dbResult.rows._array });
		} catch (err) {
			throw err;
		}
	};
};
