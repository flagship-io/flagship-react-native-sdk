import AsyncStorage from '@react-native-community/async-storage';

// Get the stored modifications from device
export const getCacheFromPhone = async (log) => {
    return new Promise((resolve) => {
        log.debug('Looking for modifications stored in cache...');
        AsyncStorage.getItem('@storage_fsModifications')
            .then((data) => {
                resolve(data != null ? JSON.parse(data) : null);
            })
            .catch((e) => {
                log.debug('AsyncStorage GET - ' + e);
                resolve(null);
            });
    });
};

/// Write the updated modification in cache device
export const setCacheFromPhone = async (data, log) => {
    try {
        const fsModifications = (data && data.fsModifications) || [];
        const jsonValue = JSON.stringify(fsModifications);
        log.debug('Storing those modifications in cache:\n' + jsonValue);
        await AsyncStorage.setItem('@storage_fsModifications', jsonValue);
    } catch (e) {
        log.debug('AsyncStorage SET failed with error:\n' + e);
    }
};
