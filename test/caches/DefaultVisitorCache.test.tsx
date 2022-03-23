import { jest, expect, it, describe } from '@jest/globals'
import { VisitorCacheDTO } from '../../src'
import { DefaultVisitorCache, VISITOR_PREFIX } from '../../src/cache/DefaultVisitorCache'
import { campaigns } from './campaigns'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

const VISITOR_CACHE_VERSION = 1

describe('Test DefaultVisitorCache', () => {
  const defaultVisitorCache = new DefaultVisitorCache()

  const visitorId = 'visitorId'
  const visitorData: VisitorCacheDTO = {
    version: VISITOR_CACHE_VERSION,
    data: {
      visitorId: 'visitorID',
      anonymousId: null,
      consent: true,
      context: {},
      campaigns: campaigns.campaigns.map(campaign => {
        return {
          campaignId: campaign.id,
          variationGroupId: campaign.variationGroupId,
          variationId: campaign.variation.id,
          isReference: campaign.variation.reference,
          type: campaign.variation.modifications.type,
          activated: false,
          flags: campaign.variation.modifications.value
        }
      })
    }
  }

  it('should ',async () => {
    await defaultVisitorCache.cacheVisitor(visitorId, visitorData)
    expect(mockAsyncStorage.setItem).toBeCalledTimes(1)
    expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(`${VISITOR_PREFIX}${visitorId}`, JSON.stringify(visitorData))
  })
  it('should ', async () => {
    await defaultVisitorCache.flushVisitor(visitorId)
    expect(mockAsyncStorage.removeItem).toBeCalledTimes(1)
    expect(mockAsyncStorage.removeItem).toHaveBeenCalledWith(`${VISITOR_PREFIX}${visitorId}`)
  })

  it('should ', async () => {
    mockAsyncStorage.getItem.mockReturnValue(JSON.stringify(visitorData))
    const data = await defaultVisitorCache.lookupVisitor(visitorId)
    expect(data).toEqual(visitorData)
  })

  it('should ', async () => {
    mockAsyncStorage.getItem.mockReturnValue(null)
    const data = await defaultVisitorCache.lookupVisitor(visitorId)
    expect(data).toBeNull()
  })
})
