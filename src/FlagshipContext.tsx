import {
    FlagshipProvider as ReactFlagshipProvider,
    FlagshipProviderProps as ReactFlagshipProviderProps,
    VisitorData,Flagship
} from '@flagship.io/react-sdk';
import React, { useEffect, useState } from 'react';
import { DefaultHitCache } from './cache/DefaultHitCache';
import { DefaultVisitorCache } from './cache/DefaultVisitorCache';
import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import  { DeviceType,getDeviceTypeAsync, osName, osVersion, modelName}  from 'expo-device';

export interface FlagshipProviderProps extends ReactFlagshipProviderProps {}

// Predefined context keys 
export const SDK_DEVICE_TYPE        = "sdk_deviceType"
export const SDK_OS_NAME            = "sdk_osName"
export const SDK_OS_VERSION_CODE    = "sdk_osVersionCode"
export const SDK_FIRST_TIME_INIT    = "sdk_firstTimeInit"
export const SDK_DEVICE_MODEL       = "sdk_deviceModel"

export const FlagshipProvider: React.FC<FlagshipProviderProps> = (props) => {
    const { children, visitorCacheImplementation, hitCacheImplementation, visitorData } = props;
    const [newVisitorData, setNewVisitorData] = useState<VisitorData|null>(null)


    useEffect(()=>{

        // Predefined context loader function
        async function loadPredefinedContext(){
            let firstTimeInit = null
            try {
                firstTimeInit = await AsyncStorage.getItem(SDK_FIRST_TIME_INIT)

            } catch (error) {
                firstTimeInit = await AsyncStorage.getItem(SDK_FIRST_TIME_INIT)
                Flagship.getConfig()?.logManager?.error("Error on get item from AsyncStorage", "loadPredefinedContext") 
            }

            let deviceType = DeviceType.UNKNOWN
            try {
                deviceType = await getDeviceTypeAsync()

            } catch (error) {
                Flagship.getConfig()?.logManager?.error("Error on getDeviceTypeAsync ", "loadPredefinedContext")
            }

            /// Set Visitor Data 
            setNewVisitorData({
                ...visitorData,
                context:{
                    ...visitorData?.context,
                    [SDK_DEVICE_TYPE]:DeviceType[deviceType],
                    [SDK_OS_NAME]: osName ?? "",
                    [SDK_OS_VERSION_CODE]:osVersion ?? "",
                    [SDK_DEVICE_MODEL]:modelName ?? "",
                    [SDK_FIRST_TIME_INIT]: !firstTimeInit
                }
            })
            AsyncStorage.setItem(SDK_FIRST_TIME_INIT, SDK_FIRST_TIME_INIT)
        }
        // Load the predefined context
        loadPredefinedContext()
    },[JSON.stringify(visitorData)])
    
    return (
        <ReactFlagshipProvider
            {...props}
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
