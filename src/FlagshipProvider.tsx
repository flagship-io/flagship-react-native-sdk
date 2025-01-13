import {
    FlagshipProvider as ReactFlagshipProvider,
    FlagshipProviderProps as ReactFlagshipProviderProps,
    VisitorData,
    Flagship,
    OS_NAME,
    OS_VERSION_CODE,
    CacheStrategy
} from '@flagship.io/react-sdk';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
        | 'nextFetchConfig'
        | 'sdkVersion'
        | 'language'
        | 'shouldSaveInstance'
    > {}

// Predefined context keys
export const SDK_FIRST_TIME_INIT = 'sdk_firstTimeInit';
export const CLIENT_CACHE_KEY = 'FS_CLIENT_VISITOR';

type AugmentedFlagship = typeof Flagship & {
    setVisitorProfile: (value: string | null) => void;
    setOnSaveVisitorProfile: (value: (v: string) => void) => void;
};

const FlagshipProviderFunc: React.FC<FlagshipProviderProps> = ({
    children,
    visitorCacheImplementation,
    hitCacheImplementation,
    visitorData,
    ...props
}) => {
    const [processedVisitorData, setProcessedVisitorData] =
        useState<VisitorData | null>(null);
    const firstTimeInitRef = React.useRef<boolean>();

    const saveVisitorProfile = useCallback(async (value: string) => {
        try {
            await AsyncStorage.setItem(CLIENT_CACHE_KEY, value);
        } catch (error) {
            Flagship.getConfig()?.logManager?.error(
                'Error accessing AsyncStorage',
                'saveVisitorProfile'
            );
        }
    }, []);

    const loadPredefinedContext = useCallback(async () => {
        try {
            if (firstTimeInitRef.current !== undefined) {
                return;
            }
            const clientCache = await AsyncStorage.getItem(CLIENT_CACHE_KEY);

            const augmentedFlagship = Flagship as AugmentedFlagship;
            augmentedFlagship.setVisitorProfile(clientCache);
            augmentedFlagship.setOnSaveVisitorProfile(saveVisitorProfile);

            firstTimeInitRef.current = !clientCache;
        } catch (error) {
            Flagship.getConfig()?.logManager?.error(
                'Error accessing AsyncStorage',
                'loadPredefinedContext'
            );
        }
    }, []);

    const updateVisitorData = useCallback(
        (data: VisitorData): VisitorData => ({
            ...data,
            id: data.id,
            context: {
                ...data.context,
                [OS_NAME]: Platform.OS,
                [OS_VERSION_CODE]: Platform.Version?.toString(),
                [SDK_FIRST_TIME_INIT]: !!firstTimeInitRef.current
            }
        }),
        []
    );

    useEffect(() => {
        async function initialize() {
            await loadPredefinedContext();
            if (visitorData) {
                const updatedData = updateVisitorData(visitorData);
                setProcessedVisitorData(updatedData);
            }
        }
        initialize();
    }, [visitorData, updateVisitorData, loadPredefinedContext]);

    const visitorCache = useMemo(() => {
        return visitorCacheImplementation || new DefaultVisitorCache();
    }, [visitorCacheImplementation]);

    const hitCache = useMemo(() => {
        return hitCacheImplementation || new DefaultHitCache();
    }, [hitCacheImplementation]);

    const trackingConfig = useMemo(() => {
        return (
            props.trackingManagerConfig || {
                poolMaxSize: DEFAULT_POOL_MAX_SIZE,
                batchIntervals: DEFAULT_TIME_INTERVAL,
                cacheStrategy: CacheStrategy.CONTINUOUS_CACHING
            }
        );
    }, [props.trackingManagerConfig]);

    return (
        <ReactFlagshipProvider
            {...props}
            trackingManagerConfig={trackingConfig}
            sdkVersion={SDK_VERSION}
            language={2}
            visitorCacheImplementation={visitorCache}
            hitCacheImplementation={hitCache}
            visitorData={processedVisitorData}
            shouldSaveInstance={true}
        >
            <TouchCaptureProvider>{children}</TouchCaptureProvider>
        </ReactFlagshipProvider>
    );
};

export const FlagshipProvider = React.memo(FlagshipProviderFunc);
