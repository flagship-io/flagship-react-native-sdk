import AsyncStorage from '@react-native-community/async-storage';

// Get the stored modifications from device
export const getCacheFromPhone = async (log) => {
    try {
        log.info('Looking for modifications stored in cache...');
        const jsonValue = await AsyncStorage.getItem(
            '@storage_fsModifications'
        );
        if (jsonValue !== null) {
            log.info('Modifications in cache found: ' + jsonValue);
            return jsonValue != null
                ? JSON.parse(jsonValue).fsModifications
                : null;
        }
    } catch (e) {
        log.info('AsyncStorage GET - ' + e);
        return null;
    }
};

/// Write
export const setCacheFromPhone = async (fsModifications, log) => {
    try {
        const jsonValue = JSON.stringify(fsModifications);
        log.info('Storing those modifications in cache:\n' + fsModifications);
        await AsyncStorage.setItem('@storage_fsModifications', jsonValue);
    } catch (e) {
        log.info('AsyncStorage SET failed with error:\n' + e);
    }
};
