import { DecisionMode } from '@flagship.io/react-sdk';
// import { SpyInstance, Mock } from 'jest-mock';
import { render, waitFor } from '@testing-library/react';
import { FlagshipProvider } from '../src/index';
import React from 'react';
import { DefaultVisitorCache } from '../src/cache/DefaultVisitorCache';
import { DefaultHitCache } from '../src/cache/DefaultHitCache';
import { Platform } from 'react-native';
import { SDK_DEVICE_TYPE, SDK_FIRST_TIME_INIT, SDK_OS_NAME, SDK_OS_VERSION_CODE } from '../src/FlagshipContext';
import  { DeviceType,getDeviceTypeAsync, osName, osVersion, modelName}  from 'expo-device';


let reactFlagshipProvider: any;
let reactProps:any;

jest.mock('@flagship.io/react-sdk', () => {
    const flagship = jest.requireActual('@flagship.io/react-sdk') as any;

    const flagshipProvider = jest.fn();

    reactFlagshipProvider = flagshipProvider
    flagshipProvider.mockImplementation((props)=>{
        reactProps = props
        return props.children;
    })

    return {
        ...flagship,
        FlagshipProvider: flagshipProvider
    };
});

describe('Name of the group', () => {
    const visitorData = {
        id: 'visitor_id',
        context: {
            isReactNative: true
        },
        isAuthenticated: false,
        hasConsented: true
    };
    const envId = 'EnvId';
    const apiKey = 'apiKey';
    const statusChangedCallback = jest.fn();
    const onInitStart = jest.fn();
    const onInitDone = jest.fn();
    const onUpdate = jest.fn();
    const onBucketingUpdated = jest.fn();

    it('should ', async () => {
        const props = {
            envId,
            apiKey,
            decisionMode: DecisionMode.DECISION_API,
            visitorData,
            statusChangedCallback,
            onInitStart,
            onInitDone,
            onUpdate,
            onBucketingUpdated
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { rerender } = render(
            <FlagshipProvider {...props}>
                <div>children</div>
            </FlagshipProvider>
        );

        await waitFor(() => {
            expect(reactFlagshipProvider).toBeCalledTimes(2);
            expect(reactProps.visitorCacheImplementation).toBeInstanceOf(DefaultVisitorCache)
            expect(reactProps.hitCacheImplementation).toBeInstanceOf(DefaultHitCache)
            expect(reactProps.visitorData).toEqual(expect.objectContaining({
                ...visitorData,
                context:{
                ...visitorData.context,
                [SDK_DEVICE_TYPE]: DeviceType[1],
                [SDK_OS_NAME]:  osName ?? "",
                [SDK_OS_VERSION_CODE]:osVersion ?? "",
                [SDK_FIRST_TIME_INIT]: true
            }}))
        });
    });
});
