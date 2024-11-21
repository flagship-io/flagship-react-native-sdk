import {
    FlagshipProvider as ReactFlagshipProvider,
    FlagshipProviderProps as ReactFlagshipProviderProps,
    VisitorData,
    Flagship,
    OS_NAME,
    OS_VERSION_CODE,
    CacheStrategy
} from '@flagship.io/react-sdk';
import React, { useEffect, useState } from 'react';
import { DefaultHitCache } from './cache/DefaultHitCache';
import { DefaultVisitorCache } from './cache/DefaultVisitorCache';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { version as SDK_VERSION } from './sdkVersion';
import { TouchCaptureProvider } from './TouchCaptureProvider';

export const DEFAULT_TIME_INTERVAL = 5;
export const DEFAULT_POOL_MAX_SIZE = 10;

export interface FlagshipProviderProps
    extends Omit<
        ReactFlagshipProviderProps,
        'reuseVisitorIds' | 'nextFetchConfig' | 'sdkVersion' | 'language'
    > {}

// Predefined context keys
export const SDK_FIRST_TIME_INIT = 'sdk_firstTimeInit';

export const FlagshipProvider: React.FC<FlagshipProviderProps> = ({
    children,
    visitorCacheImplementation,
    hitCacheImplementation,
    visitorData,
    ...props
}) => {
    const [newVisitorData, setNewVisitorData] = useState<VisitorData | null>(
        visitorData
    );

    useEffect(() => {
        async function loadPredefinedContext() {
            let firstTimeInit = null;
            try {
                firstTimeInit = await AsyncStorage.getItem(SDK_FIRST_TIME_INIT);
            } catch (error) {
                Flagship.getConfig()?.logManager?.error(
                    'Error on get item from AsyncStorage',
                    'loadPredefinedContext'
                );
            }

            setNewVisitorData({
                ...(visitorData as VisitorData),
                id: Flagship.getVisitor()?.visitorId,
                context: {
                    ...visitorData?.context,
                    [OS_NAME]: Platform.OS,
                    [OS_VERSION_CODE]: Platform.Version?.toString(),
                    [SDK_FIRST_TIME_INIT]: !firstTimeInit
                }
            });
            AsyncStorage.setItem(SDK_FIRST_TIME_INIT, SDK_FIRST_TIME_INIT);
        }
        if (visitorData) {
            loadPredefinedContext();
        }
    }, [JSON.stringify(visitorData)]);

    return (
        <ReactFlagshipProvider
            {...props}
            trackingManagerConfig={
                props.trackingManagerConfig || {
                    poolMaxSize: DEFAULT_POOL_MAX_SIZE,
                    batchIntervals: DEFAULT_TIME_INTERVAL,
                    cacheStrategy: CacheStrategy.CONTINUOUS_CACHING
                }
            }
            sdkVersion={SDK_VERSION}
            language={2}
            visitorCacheImplementation={
                visitorCacheImplementation || new DefaultVisitorCache()
            }
            hitCacheImplementation={
                hitCacheImplementation || new DefaultHitCache()
            }
            visitorData={newVisitorData}
        >
            <TouchCaptureProvider>{children}</TouchCaptureProvider>
        </ReactFlagshipProvider>
    );
};
