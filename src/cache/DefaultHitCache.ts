import { HitCacheDTO, IHitCacheImplementation } from '@flagship.io/react-sdk';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FS_HIT_PREFIX = 'FS_DEFAULT_HIT_CACHE_';
export class DefaultHitCache implements IHitCacheImplementation {
    async cacheHit(visitorId: string, data: HitCacheDTO): Promise<void> {
        const localDatabase = await AsyncStorage.getItem(
            FS_HIT_PREFIX + visitorId
        );
        let dataJson = '';
        if (localDatabase) {
            const localData = localDatabase.slice(0, -1);
            dataJson = `${localData},${JSON.stringify(data)}]`;
        } else {
            dataJson = `[${JSON.stringify(data)}]`;
        }
        await AsyncStorage.setItem(FS_HIT_PREFIX + visitorId, dataJson);
    }

    async lookupHits(visitorId: string): Promise<HitCacheDTO[]> {
        const data = await AsyncStorage.getItem(FS_HIT_PREFIX + visitorId);
        await AsyncStorage.removeItem(FS_HIT_PREFIX + visitorId);
        return data ? JSON.parse(data) : null;
    }

    async flushHits(visitorId: string): Promise<void> {
        await AsyncStorage.removeItem(FS_HIT_PREFIX + visitorId);
    }
}