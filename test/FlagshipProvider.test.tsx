import {
    DecisionMode,
    Flagship,
    OS_NAME,
    OS_VERSION_CODE
} from '@flagship.io/react-sdk';
import { render, waitFor } from '@testing-library/react-native';
import { FlagshipProvider } from '../src/index';
import React from 'react';
import { DefaultVisitorCache } from '../src/cache/DefaultVisitorCache';
import { DefaultHitCache } from '../src/cache/DefaultHitCache';
import { Platform, Text } from 'react-native';
import { SDK_FIRST_TIME_INIT } from '../src/FlagshipProvider';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

let reactFlagshipProvider: any;
let reactProps: any;

jest.mock('@flagship.io/react-sdk', () => {
    const flagship = jest.requireActual('@flagship.io/react-sdk') as any;

    const flagshipProvider = jest.fn();

    reactFlagshipProvider = flagshipProvider;
    flagshipProvider.mockImplementation((props) => {
        reactProps = props;
        return props.children;
    });

    return {
        ...flagship,
        FlagshipProvider: flagshipProvider
    };
});

describe('FlagshipProvider Component', () => {
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

    it('should initialize with correct props', async () => {
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
        const Component = () => <Text>children</Text>;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { rerender } = render(
            <FlagshipProvider {...props}>
                <Component />
            </FlagshipProvider>
        );

        await waitFor(() => {
            expect(reactFlagshipProvider).toBeCalledTimes(2);
            expect(reactProps.visitorCacheImplementation).toBeInstanceOf(
                DefaultVisitorCache
            );
            expect(reactProps.hitCacheImplementation).toBeInstanceOf(
                DefaultHitCache
            );
            expect(reactProps.visitorData).toEqual(
                expect.objectContaining({
                    ...visitorData,
                    context: {
                        ...visitorData.context,
                        [OS_NAME]: Platform.OS,
                        [OS_VERSION_CODE]: Platform.Version,
                        [SDK_FIRST_TIME_INIT]: true
                    }
                })
            );
        });

        const visitorData2 = {
            ...visitorData,
            id: 'visitor_id2'
        };

        rerender(
            <FlagshipProvider {...props} visitorData={visitorData2}>
                <Component />
            </FlagshipProvider>
        );

        await waitFor(() => {
            expect(reactFlagshipProvider).toBeCalledTimes(4);
            expect(reactProps.visitorCacheImplementation).toBeInstanceOf(
                DefaultVisitorCache
            );
            expect(reactProps.hitCacheImplementation).toBeInstanceOf(
                DefaultHitCache
            );
            expect(reactProps.visitorData).toEqual(
                expect.objectContaining({
                    ...visitorData2,
                    context: {
                        ...visitorData2.context,
                        [OS_NAME]: Platform.OS,
                        [OS_VERSION_CODE]: Platform.Version,
                        [SDK_FIRST_TIME_INIT]: true
                    }
                })
            );
        });
    });
});

describe('FlagshipProvider without visitorData', () => {
    const envId = 'EnvId';
    const apiKey = 'apiKey';
    const onSdkStatusChanged = jest.fn();
    const onInitStart = jest.fn();
    const onInitDone = jest.fn();
    const onUpdate = jest.fn();
    const onBucketingUpdated = jest.fn();

    it('should initialize with null visitorData', async () => {
        const props = {
            envId,
            apiKey,
            decisionMode: DecisionMode.DECISION_API,
            visitorData: null,
            statusChangedCallback: onSdkStatusChanged,
            onInitStart,
            onInitDone,
            onUpdate,
            onBucketingUpdated
        };
        const Component = () => <Text>children</Text>;
        render(
            <FlagshipProvider {...props}>
                <Component />
            </FlagshipProvider>
        );

        await waitFor(() => {
            expect(reactFlagshipProvider).toBeCalledTimes(1);
            expect(reactProps.visitorCacheImplementation).toBeInstanceOf(
                DefaultVisitorCache
            );
            expect(reactProps.hitCacheImplementation).toBeInstanceOf(
                DefaultHitCache
            );
            expect(reactProps.visitorData).toBeNull();
        });
    });
});

describe('AsyncStorage throw while loadPredefinedContext', () => {
    const envId = 'EnvId';
    const apiKey = 'apiKey';

    const visitorData = {
        id: 'visitor_id',
        context: {
            isReactNative: true
        },
        isAuthenticated: false,
        hasConsented: true
    };

    it('should throw an error', async () => {
        const props = {
            envId,
            apiKey,
            decisionMode: DecisionMode.DECISION_API,
            visitorData
        };

        const logManager = {
            error: jest.fn()
        };

        Flagship.getConfig = jest.fn(
            () =>
                ({
                    logManager
                } as any)
        );

        (mockAsyncStorage.getItem as any).mockRejectedValueOnce(
            new Error('AsyncStorage error')
        );

        const Component = () => <Text>children</Text>;

        render(
            <FlagshipProvider {...props}>
                <Component />
            </FlagshipProvider>
        );

        await waitFor(() => {
            expect(reactFlagshipProvider).toBeCalledTimes(2);
            expect(logManager.error).toBeCalledTimes(1);
        });
    });
});
