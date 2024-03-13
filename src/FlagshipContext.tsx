import {
    FlagshipProvider as ReactFlagshipProvider,
    FlagshipProviderProps as ReactFlagshipProviderProps,
    VisitorData,Flagship, OS_NAME, OS_VERSION_CODE,
} from '@flagship.io/react-sdk';
import React, { useEffect, useState } from 'react';
import { DefaultHitCache } from './cache/DefaultHitCache';
import { DefaultVisitorCache } from './cache/DefaultVisitorCache';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { version as SDK_VERSION } from './sdkVersion';

export interface FlagshipProviderProps extends Omit<ReactFlagshipProviderProps, 'reuseVisitorIds'|'nextFetchConfig'|'sdkVersion'|"language"> {}

// Predefined context keys 
export const SDK_FIRST_TIME_INIT    = "sdk_firstTimeInit"

export const FlagshipProvider: React.FC<FlagshipProviderProps> = ({ children, visitorCacheImplementation, hitCacheImplementation, visitorData, ...props }) => {
    
    const [newVisitorData, setNewVisitorData] = useState<VisitorData|null>(null)

    useEffect(()=>{
        async function loadPredefinedContext(){
            let firstTimeInit = null
            try {
                firstTimeInit = await AsyncStorage.getItem(SDK_FIRST_TIME_INIT)

            } catch (error) {
                Flagship.getConfig()?.logManager?.error("Error on get item from AsyncStorage", "loadPredefinedContext") 
            }

            /// Set Visitor Data 
            setNewVisitorData({
                ...visitorData as VisitorData,
                context:{
                    ...visitorData?.context,
                    [OS_NAME]: Platform.OS,
                    [OS_VERSION_CODE]:Platform.Version?.toString(),
                    [SDK_FIRST_TIME_INIT]: !firstTimeInit
                }
            })
            AsyncStorage.setItem(SDK_FIRST_TIME_INIT, SDK_FIRST_TIME_INIT)
        }
        if(visitorData){
            // Load the predefined context
            loadPredefinedContext()
        }
    },[JSON.stringify(visitorData)])
    
    return (
        <ReactFlagshipProvider
            {...props}
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
            <>{children}</>
        </ReactFlagshipProvider>
    );
};
