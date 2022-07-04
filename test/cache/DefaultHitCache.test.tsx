import { jest, expect, it, describe } from '@jest/globals'
import { HitCacheDTO, HitType } from '../../src'
import { DefaultHitCache, FS_HIT_PREFIX } from '../../src/cache/DefaultHitCache'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

const HIT_CACHE_VERSION = 1, SDK_APP="APP"

describe('Test DefaultHitCache', () => {
  const defaultHitCache = new DefaultHitCache()

  const visitorId = 'visitorId'
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

  it('should ', async () => {
    await defaultHitCache.cacheHit(visitorId, visitorData)
    expect(mockAsyncStorage.setItem).toBeCalledTimes(1)
    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(`${FS_HIT_PREFIX}${visitorId}`, JSON.stringify([visitorData]))
  })
  it('should ',async () => {
    mockAsyncStorage.getItem.mockReturnValue(JSON.stringify([visitorData]))
    await defaultHitCache.cacheHit(visitorId, visitorData)
    expect(mockAsyncStorage.setItem).toBeCalledTimes(1)
    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(`${FS_HIT_PREFIX}${visitorId}`, JSON.stringify([visitorData, visitorData]))
  })
  it('should ', async () => {
    await defaultHitCache.flushHits(visitorId)
    expect(mockAsyncStorage.removeItem).toBeCalledTimes(1)
    expect(mockAsyncStorage.removeItem).toHaveBeenCalledWith(`${FS_HIT_PREFIX}${visitorId}`)
  })

  it('should ',async () => {
    mockAsyncStorage.getItem.mockReturnValue(JSON.stringify(visitorData))
    const data = await defaultHitCache.lookupHits(visitorId)
    expect(data).toEqual(visitorData)
    expect(mockAsyncStorage.removeItem).toBeCalledTimes(1)
  })
})