import { HitCacheDTO, IHitCacheImplementation } from '@flagship.io/react-sdk';
import syncStorage from '../helper/SyncStorage2';

export const FS_HIT_PREFIX = 'FS_DEFAULT_HIT_CACHE_';
export class DefaultHitCache implements IHitCacheImplementation {
    
    async cacheHit(visitorId: string, data: HitCacheDTO): Promise<void> {
        const localDatabase = await syncStorage.get(
            FS_HIT_PREFIX + visitorId
        );
        let dataJson = '';
        if (localDatabase) {
            const localData = localDatabase.slice(0, -1);
            dataJson = `${localData},${JSON.stringify(data)}]`;
        } else {
            dataJson = `[${JSON.stringify(data)}]`;
        }
        await syncStorage.set(FS_HIT_PREFIX + visitorId, dataJson);
    }

    lookupHits(visitorId: string): HitCacheDTO[] {
        const data = syncStorage.get(FS_HIT_PREFIX + visitorId);
        syncStorage.remove(FS_HIT_PREFIX + visitorId);
        return data ? JSON.parse(data) : null;
    }

    async flushHits(visitorId: string): Promise<void> {
        await syncStorage.remove(FS_HIT_PREFIX + visitorId);
    }
}
