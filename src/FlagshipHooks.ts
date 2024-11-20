'use client'

import { Flagship, IPageView, UseFlagshipOutput as OriginalUseFlagshipOutput, useFlagship as useFs } from '@flagship.io/react-sdk'
import { Dimensions, PixelRatio, Platform } from 'react-native';

export type UseFlagshipOutput =  Omit<OriginalUseFlagshipOutput, 'collectEAIData'> & {
  collectEAIData: (screenNam: string) => void
}

type PlatformOS = typeof Platform.OS;

const DEVICE_CATEGORY_MAP: Record<PlatformOS, string> = {
  ios: 'iphone',
  android: 'android',
  macos: 'darwin',
  windows: 'win32',
  web: 'browser',
};



export const useFlagship = (): UseFlagshipOutput => {
  const {collectEAIData:fsCollectEAIData, ...fs} = useFs()

  function collectEAIData (screenName:string): void {
    if (!fs.context) {
      return
    }

    const viewport = Dimensions.get('window')
    const screen = Dimensions.get('screen')

    const pageView :IPageView = {
      visitorId: fs.visitorId as string,
      customerAccountId: Flagship.getConfig()?.envId as string,
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
      eventCategory:"click tunnel auto",
      timezoneOffset: new Date().getTimezoneOffset(),
    }
    return (fsCollectEAIData as any)(pageView)
  }

  return {
    ...fs,
    collectEAIData
  }
}
