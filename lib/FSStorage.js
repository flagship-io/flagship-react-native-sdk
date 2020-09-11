import AsyncStorage from '@react-native-community/async-storage';

// Get the stored modifications from device
export const getCacheFromPhone = async (log) => {
    const modificationsPromise = new Promise((resolve) => {
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
    const bucketPromise = new Promise((resolve) => {
        log.debug('Looking for bucketing stored in cache...');
        AsyncStorage.getItem('@storage_fsBucketing')
            .then((data) => {
                resolve(data != null ? JSON.parse(data) : null);
            })
            .catch((e) => {
                log.debug('AsyncStorage GET - ' + e);
                resolve(null);
            });
    });

    return new Promise((resolve) => {
        Promise.all([modificationsPromise, bucketPromise]).then((values) => {
            console.log(values);
            resolve({
                modifications: values[0],
                bucketing: values[1]
            });
        });
    });
};

/// Write the updated modification in cache device
export const setModificationsCacheFromPhone = async (data, log) => {
    try {
        const fsModifications = (data && data.fsModifications) || [];
        const jsonValue = JSON.stringify(fsModifications);
        log.debug('Storing those modifications in cache:\n' + jsonValue);
        await AsyncStorage.setItem('@storage_fsModifications', jsonValue);
    } catch (e) {
        log.debug('AsyncStorage SET failed with error:\n' + e);
    }
};

export const setBucketingCacheFromPhone = async (data, log) => {
    try {
        const bucketingData = (data && data.payload) || null;
        if (bucketingData !== null) {
            const jsonValue = JSON.stringify(bucketingData);
            log.debug('Storing bucketing in cache:\n' + jsonValue);
            await AsyncStorage.setItem('@storage_fsBucketing', jsonValue);
        } else {
            log.debug('No bucketing data to save in cache!');
        }
    } catch (e) {
        log.debug('AsyncStorage SET failed with error:\n' + e);
    }
};
