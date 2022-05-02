import { jest as mockJest, expect, it, describe } from '@jest/globals'
import { HitCacheDTO, HitType } from '../../src'
import { DefaultHitCache, FS_HIT_PREFIX } from '../../src/cache/DefaultHitCache'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { SpyInstance } from "jest-mock";
import SyncStorage from '../../src/helper/SyncStorage';
import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';

describe('SyncStorage', () => {
    
    it('should ', () => {
        const item:KeyValuePair = ["key", "value"] 
        SyncStorage.saveItem(item)
        expect(SyncStorage.getAllKeys()).toEqual(["key"])
    });
});