import {
    FlagshipProvider as ReactFlagshipProvider,
    FlagshipProviderProps as ReactFlagshipProviderProps,
    VisitorData
} from '@flagship.io/react-sdk';
import React, { useEffect, useState } from 'react';
import { DefaultHitCache } from './cache/DefaultHitCache';
import { DefaultVisitorCache } from './cache/DefaultVisitorCache';
import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FlagshipProviderProps extends ReactFlagshipProviderProps {}

export const SDK_DEVICE_TYPE = "sdk_deviceType"
export const SDK_OS_NAME="sdk_osName"
export const SDK_OS_VERSION_CODE="sdk_osVersionCode"
export const SDK_FIRST_TIME_INIT= "sdk_firstTimeInit"

const DEVICE_TV = "TV"
const DEVICE_IPAD = "IPAD"

export const FlagshipProvider: React.FC<FlagshipProviderProps> = (props) => {
    const { children, visitorCacheImplementation, hitCacheImplementation, visitorData } = props;
    const [newVisitorData, setNewVisitorData] = useState<VisitorData|null>(null)

    const getDeviceType = ()=>{
        if (Platform.isTV) {
            return DEVICE_TV
        }
        if ((Platform as any).isPad ) {
            return DEVICE_IPAD
        }
        return null
    }

    useEffect(()=>{
        const deviceType = getDeviceType()

        const deviceTypeContext =deviceType? {
            [SDK_DEVICE_TYPE]: getDeviceType() as string,
        }:null

        AsyncStorage.getItem(SDK_FIRST_TIME_INIT)
        .then((item)=>{
            setNewVisitorData({
                ...visitorData,
                context:{
                    ...visitorData?.context,
                    ...deviceTypeContext,
                    [SDK_OS_NAME]: Platform.OS,
                    [SDK_OS_VERSION_CODE]: Platform.Version,
                    [SDK_FIRST_TIME_INIT]: !item
                }
            })
            AsyncStorage.setItem(SDK_FIRST_TIME_INIT, SDK_FIRST_TIME_INIT)
        })
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
