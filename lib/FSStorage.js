import AsyncStorage from '@react-native-community/async-storage';

// Get the stored modifications from device
export const getCacheFromPhone = async (log) => {
    try {
        log.debug('Looking for modifications stored in cache...');
        const jsonValue = await AsyncStorage.getItem(
            '@storage_fsModifications'
        );
        return jsonValue != null ? JSON.parse(jsonValue).fsModifications : null;
    } catch (e) {
        log.debug('AsyncStorage GET - ' + e);
        return null;
    }
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
