import { DecisionMode, OS_NAME, OS_VERSION_CODE } from '@flagship.io/react-sdk';
import { render, waitFor } from '@testing-library/react';
import { FlagshipProvider } from '../src/index';
import React from 'react';
import { DefaultVisitorCache } from '../src/cache/DefaultVisitorCache';
import { DefaultHitCache } from '../src/cache/DefaultHitCache';
import { SDK_FIRST_TIME_INIT } from '../src/FlagshipContext';
import { Platform } from 'react-native';


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
                [OS_NAME]:  Platform.OS,
                [OS_VERSION_CODE]: Platform.Version,
                [SDK_FIRST_TIME_INIT]: true
            }}))
        });
    });
});

describe('Name of the group', () => {

    const envId = 'EnvId';
    const apiKey = 'apiKey';
    const onSdkStatusChanged = jest.fn();
    const onInitStart = jest.fn();
    const onInitDone = jest.fn();
    const onUpdate = jest.fn();
    const onBucketingUpdated = jest.fn();

    it('should ', async () => {
        const props = {
            envId,
            apiKey,
            decisionMode: DecisionMode.DECISION_API,
            visitorData:null,
            statusChangedCallback: onSdkStatusChanged,
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
            expect(reactFlagshipProvider).toBeCalledTimes(1);
            expect(reactProps.visitorCacheImplementation).toBeInstanceOf(DefaultVisitorCache)
            expect(reactProps.hitCacheImplementation).toBeInstanceOf(DefaultHitCache)
            expect(reactProps.visitorData).toBeNull()
        });
    });
});