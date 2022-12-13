import { HitCacheDTO, IHitCacheImplementation } from '@flagship.io/react-sdk';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FS_HIT_PREFIX = 'FS_DEFAULT_HIT_CACHE_';
export class DefaultHitCache implements IHitCacheImplementation {
    async cacheHit(hits: Record<string, HitCacheDTO>): Promise<void> {
        const localDatabaseJson = await AsyncStorage.getItem(FS_HIT_PREFIX)||'{}';
        const localDatabase = JSON.parse(localDatabaseJson)

        const newLocalDatabase = {
            ...localDatabase,
            ...hits
          }
          
        await AsyncStorage.setItem(FS_HIT_PREFIX, JSON.stringify(newLocalDatabase))
    }

    async lookupHits(): Promise<Record<string, HitCacheDTO>> {
        const localDatabaseJson = await AsyncStorage.getItem(FS_HIT_PREFIX) || '{}'
        return JSON.parse(localDatabaseJson)
    }
    async flushHits(hitKeys: string[]): Promise<void> {
        const localDatabaseJson = await AsyncStorage.getItem(FS_HIT_PREFIX) || '{}'
        const localDatabase:Record<string, HitCacheDTO> = JSON.parse(localDatabaseJson)
    
        hitKeys.forEach(key => {
          delete localDatabase[key]
        })
    
        await AsyncStorage.setItem(FS_HIT_PREFIX, JSON.stringify(localDatabase))
    }

    async flushAllHits(): Promise<void> {
        await AsyncStorage.removeItem(FS_HIT_PREFIX);
    }
}