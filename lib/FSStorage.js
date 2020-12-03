import AsyncStorage from '@react-native-community/async-storage';

const VISITOR_CACHE_KEY = '@storage_fsVisitor';
const MODIFICATIONS_CACHE_KEY = '@storage_fsModifications';
const BUCKETING_CACHE_KEY = '@storage_fsBucketing';

// Get the stored modifications from device
export const getCacheFromPhone = async (log) => {
    const modificationsPromise = new Promise((resolve) => {
        log.debug('Looking for modifications stored in cache...');
        AsyncStorage.getItem(MODIFICATIONS_CACHE_KEY)
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
        AsyncStorage.getItem(BUCKETING_CACHE_KEY)
            .then((data) => {
                resolve(data != null ? JSON.parse(data) : null);
            })
            .catch((e) => {
                log.debug('AsyncStorage GET - ' + e);
                resolve(null);
            });
    });

    const visitorPromise = new Promise((resolve) => {
        log.debug('Looking for visitor stored in cache...');
        AsyncStorage.getItem(VISITOR_CACHE_KEY)
            .then((data) => {
                resolve(data != null ? JSON.parse(data) : null);
            })
            .catch((e) => {
                log.debug('AsyncStorage GET - ' + e);
                resolve(null);
            });
    });

    return new Promise((resolve) => {
        Promise.all([modificationsPromise, bucketPromise, visitorPromise]).then(
            (values) => {
                resolve({
                    modifications: values[0],
                    bucketing: values[1]
                });
            }
        );
    });
};

/// Write the updated modification in cache device
export const setModificationsCacheFromPhone = async (data, log) => {
    try {
        const fsModifications = (data && data.fsModifications) || [];
        const jsonValue = JSON.stringify(fsModifications);
        log.debug('Storing those modifications in cache:\n' + jsonValue);
        await AsyncStorage.setItem(MODIFICATIONS_CACHE_KEY, jsonValue);
    } catch (e) {
        log.debug('AsyncStorage SET failed with error:\n' + e);
    }
};

export const setVisitorReconciliationInCache = async (visitorData, log) => {
    try {
        const jsonValue = JSON.stringify({
            id: visitorData.id,
            anonymousId: visitorData.anonymousId
        });
        log.debug('Storing those modifications in cache:\n' + jsonValue);
        await AsyncStorage.setItem(VISITOR_CACHE_KEY, jsonValue);
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
            await AsyncStorage.setItem(BUCKETING_CACHE_KEY, jsonValue);
        } else {
            log.debug('No bucketing data to save in cache!');
        }
    } catch (e) {
        log.debug('AsyncStorage SET failed with error:\n' + e);
    }
};
