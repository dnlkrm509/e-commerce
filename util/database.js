import * as SQlite from 'expo-sqlite';
import { Profile } from '../models/profile';

const database = SQlite.openDatabase('profile.db');

export function init() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`
                CREATE TABLE IF NOT EXISTS profile (
                    id INTEGER PRIMARY KEY NOT NULL,
                    imageUri TEXT NOT NULL,
                    fullName TEXT NOT NULL,
                    dateOfBirth TEXT NOT NULL,
                    gender TEXT NOT NULL,
                    email TEXT NOT NULL,
                    phoneNumber REAL NOT NULL
                )`,
                [],
                () => {
                    resolve();
                },
                (_, error) => {
                    reject(error);
                }
            )
        })
    });

    return promise;
};

export function insertData(Data) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`
                    REPLACE INTO profile (imageUri, fullName, dateOfBirth, gender, email, phoneNumber)
                    VALUES (?, ?, ?, ?, ?, ?)
                `,
                [
                    Data.imageUri,
                    Data.fullName,
                    Data.dateOfBirth,
                    Data.gender,
                    Data.email,
                    Data.phoneNumber
                ],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error)
                }
            );
        })
    });

    return promise;
};

export function numberOfRows() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`
                SELECT * FROM profile
            `,
            [],
            (_, result) => {
                resolve(result.rows.length);
            },
            (_, error) => {
                reject(error);
            }
            )
        })
    })
    return promise;
};

export function fetchSingleData(id) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM profile WHERE id = ?`,
                [id],
                (_, result) => {
                    const dPProfile = result.rows._array[0];
                    const profile = new Profile(
                        dPProfile.imageUri,
                        dPProfile.fullName,
                        dPProfile.dateOfBirth,
                        dPProfile.gender,
                        dPProfile.email,
                        dPProfile.phoneNumber,
                        dPProfile.id
                    )
                    resolve(profile)
                },
                (_, error) => {
                    reject(error);
                }
            );
        })
    });

    return promise;
}