import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`CREATE TABLE  IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL, 
                lng REAL NOT NULL
                );`,
				[],
				() => {
					resolve(); // resolve if it successfully created the database, no parameter received in this case
				},
				(_, err) => {
					reject(err); // else, reject showing the error
				}
			);
		});
	});

	return promise;
};

export const insertPlace = (title, imageUri, address, lat, lng) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`INSERT INTO places (title, imageUri, address, lat, lng) 
                VALUES (?, ?, ?, ?, ?)`,
				[title, imageUri, address, lat, lng],
				(_, result) => {
					resolve(result); // resolve if it successfully inserted into the database, I want the result
				},
				(_, err) => {
					reject(err); // else, reject showing the error
				}
			);
		});
	});

	return promise;
};

export const fetchPlaces = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`SELECT * 
                FROM places`,
				[],
				(_, result) => {
					resolve(result); // resolve if it successfully inserted into the database, I want the result
				},
				(_, err) => {
					reject(err); // else, reject showing the error
				}
			);
		});
	});

	return promise;
};
