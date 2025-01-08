'use client'

import { Flagship, IPageView, UseFlagshipOutput as OriginalUseFlagshipOutput, useFlagship as useFs } from '@flagship.io/react-sdk'
import { useCallback, useMemo } from 'react';
import { Dimensions, PixelRatio, Platform } from 'react-native';

export type UseFlagshipOutput =  Omit<OriginalUseFlagshipOutput, 'collectEAIEventsAsync'> & {
  collectEAIEventsAsync: (screenNam: string) => Promise<void>
  sendEaiPageView: (screenName: string) => void
}

type PlatformOS = typeof Platform.OS;

const DEVICE_CATEGORY_MAP: Record<PlatformOS, string> = {
  ios: 'iphone',
  android: 'android',
  macos: 'darwin',
  windows: 'win32',
  web: 'browser',
};

const createPageView = (
  visitorId: string,
  screenName: string
): IPageView => {
  const viewport = Dimensions.get('window');
  const screen = Dimensions.get('screen');
  
  const config = Flagship.getConfig();

  return {
    visitorId: visitorId,
    customerAccountId: config?.envId ?? '',
    currentUrl: screenName,
    hasAdBlocker: false,
    screenDepth: "24",
    screenSize: `${screen.width},${screen.height};`,
    doNotTrack: 'unspecified',
    fonts: '[]',
    hasFakeBrowserInfos: false,
    hasFakeLanguageInfos: false,
    hasFakeOsInfos: false,
    hasFakeResolutionInfos: false,
    userLanguage: 'en',
    deviceCategory: DEVICE_CATEGORY_MAP[Platform.OS] || 'unknown',
    pixelRatio: PixelRatio.get(),
    viewportSize: `[${viewport.width},${viewport.height}]`,
    touchSupport: "[5, true, true]",
    userAgent: 'React Native',
    documentReferer: '',
    eventCategory: "click tunnel auto",
    timezoneOffset: new Date().getTimezoneOffset(),
  };
};



export const useFlagship = (): UseFlagshipOutput => {
  // const {collectEAIDataAsync:fsCollectEAIDataAsync, ...fs} = useFs()
  const fs = useFs()

  const sendEaiPageView = useCallback((screenName: string): void =>{
    if (!fs.context) {
      return
    }
    const pageView :IPageView = createPageView(fs.visitorId as string, screenName)
    const visitor = Flagship.getVisitor() as any
    visitor.sendEaiPageView(pageView)
  }, [fs.context])

  const collectEAIEventsAsync = useCallback(async (screenName:string): Promise<void> => {
    if (!fs.context) {
      return
    }
    const pageView :IPageView = createPageView(fs.visitorId as string, screenName)
    return (fs.collectEAIEventsAsync as any)(pageView)
  }, [fs.collectEAIEventsAsync, fs.context])

  return useMemo(()=>({
    ...fs,
    collectEAIEventsAsync,
    sendEaiPageView
  }), [fs, collectEAIEventsAsync, sendEaiPageView])
}
