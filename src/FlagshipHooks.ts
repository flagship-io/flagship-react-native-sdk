import { Flagship, IPageView, UseFlagshipOutput as OriginalUseFlagshipOutput, useFlagship as useFs, Visitor } from '@flagship.io/react-sdk'
import { useCallback, useMemo } from 'react';
import { Dimensions, PixelRatio, Platform } from 'react-native';
import { VisitorAugmented } from './type';

export type UseFlagshipOutput =  Omit<OriginalUseFlagshipOutput, 'collectEAIEventsAsync'> & {
  /**
   * Collect Emotion AI events.
   * @param screenName The name of the screen to be displayed. 
   * @returns 
   */
  collectEAIEventsAsync: (screenName: string) => Promise<void>
  /**
   * Send a page view event to Emotion AI service.
   * 
   * This function should be invoked each time a new screen is displayed.
   * 
   * We recommend calling this function in the useEffect hook of the screen component when the screen is mounted.
   * 
   * No event will be sent when the emotion AI event collection is not in progress.
   * 
   * @param screenName  The name of the screen to be displayed.
   * @returns 
   */
  sendEaiPageViewAsync: (screenName: string) => Promise<void>
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
    visitorId,
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

  const fs = useFs()

  const sendEaiPageViewAsync = useCallback(async(screenName: string): Promise<void> =>{
    if (!fs.context || !fs.visitorId) {
      return
    }
    const pageView :IPageView = createPageView(fs.visitorId, screenName)
    const visitor = Flagship.getVisitor() as unknown as  VisitorAugmented

    if (typeof visitor.sendEaiPageView !== 'function') {
      return
    }

    visitor.sendEaiPageView(pageView)
  }, [fs.context, fs.visitorId])

  const collectEAIEventsAsync = useCallback(async (screenName:string): Promise<void> => {
    if (!fs.context) {
      return
    }
    const pageView :IPageView = createPageView(fs.visitorId as string, screenName)
    return (fs.collectEAIEventsAsync as (page:IPageView)=>void)(pageView)
  }, [fs.collectEAIEventsAsync, fs.context])

  return useMemo(()=>({
    ...fs,
    collectEAIEventsAsync,
    sendEaiPageViewAsync
  }), [fs, collectEAIEventsAsync, sendEaiPageViewAsync])
}
