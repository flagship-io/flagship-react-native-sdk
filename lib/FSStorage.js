import AsyncStorage from '@react-native-community/async-storage';

// Get the stored modifications from device
export const getCacheFromPhone = async (log) => {
    return new Promise((resolve) => {
        log.debug('Looking for modifications stored in cache...');
        AsyncStorage.getItem('@storage_fsModifications')
            .then((data) => {
                resolve(data != null ? JSON.parse(data).fsModifications : null);
            })
            .catch((e) => {
                log.debug('AsyncStorage GET - ' + e);
                resolve(null);
            });
    });
};

/// Write
export const setCacheFromPhone = async (fsModifications, log) => {
    try {
        const jsonValue = JSON.stringify(fsModifications);
        log.debug('Storing those modifications in cache:\n' + jsonValue);
        await AsyncStorage.setItem('@storage_fsModifications', jsonValue);
    } catch (e) {
        log.debug('AsyncStorage SET failed with error:\n' + e);
    }
};
