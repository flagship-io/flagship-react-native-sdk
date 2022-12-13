import { jest, expect, it, describe } from '@jest/globals'
import { HitCacheDTO, HitType } from '../../src'
import { DefaultHitCache, FS_HIT_PREFIX } from '../../src/cache/DefaultHitCache'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

const HIT_CACHE_VERSION = 1, SDK_APP="APP"

describe('Test DefaultHitCache', () => {
  const defaultHitCache = new DefaultHitCache()

  const visitorId = 'visitorId'
  const key = visitorId +"key1"
  const key2 = visitorId +"key2"
  const visitorData : HitCacheDTO = {
    version: HIT_CACHE_VERSION,
    data: {
      visitorId: visitorId,
      anonymousId: null,
      type: HitType.SCREEN,
      content: {
        visitorId,
        ds: SDK_APP,
        type: HitType.SCREEN,
        anonymousId: null,
        documentLocation: 'home'
      },
      time: Date.now()
    }
  }

  const cache = {[key]: visitorData}
  const cache2 = {
    ...cache,
    [key2]: visitorData
  }

  it('test cacheHit 1 ', async () => {
    await defaultHitCache.cacheHit(cache)
    expect(mockAsyncStorage.setItem).toBeCalledTimes(1)
    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(FS_HIT_PREFIX, JSON.stringify(cache))
  })
  it('test cacheHit 2',async () => {
    mockAsyncStorage.getItem.mockReturnValue(JSON.stringify(cache))
    await defaultHitCache.cacheHit(cache2)
    expect(mockAsyncStorage.setItem).toBeCalledTimes(1)
    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(FS_HIT_PREFIX, JSON.stringify(cache2))
  })
  it('test flushHits ', async () => {
    await defaultHitCache.flushHits([key2])
    expect(mockAsyncStorage.setItem).toBeCalledTimes(1)
    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(FS_HIT_PREFIX, JSON.stringify(cache))
  })

  it('lookupHits ',async () => {
    mockAsyncStorage.getItem.mockReturnValue(JSON.stringify(cache2))
    const data = await defaultHitCache.lookupHits()
    expect(data).toEqual(cache2)
  })

  it('lookupHits ',async () => {
    const data = await defaultHitCache.flushAllHits()
    expect(mockAsyncStorage.removeItem).toBeCalledTimes(1)
    expect(mockAsyncStorage.removeItem).toHaveBeenCalledWith(FS_HIT_PREFIX)
  })
})