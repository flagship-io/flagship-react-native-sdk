import {
    DecisionMode,
    Flagship,
    OS_NAME,
    OS_VERSION_CODE
} from '@flagship.io/react-sdk';
import { render, waitFor, act } from '@testing-library/react-native';
import { FlagshipProvider } from '../src/index';
import React from 'react';
import { DefaultVisitorCache } from '../src/cache/DefaultVisitorCache';
import { DefaultHitCache } from '../src/cache/DefaultHitCache';
import { Platform, Text } from 'react-native';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { CLIENT_CACHE_KEY, SDK_FIRST_TIME_INIT } from '../src/Constant';

type AugmentedFlagship = typeof Flagship & {
    setVisitorProfile: (value: string | null) => void;
    setOnSaveVisitorProfile: (value: (v: string) => void) => void;
};

let reactFlagshipProvider: any;
let reactProps: any;

jest.mock('@flagship.io/react-sdk', () => {
    const fs = jest.requireActual('@flagship.io/react-sdk') as any;

    const flagshipProvider = jest.fn();

    reactFlagshipProvider = flagshipProvider;
    flagshipProvider.mockImplementation((props) => {
        reactProps = props;
        return props.children;
    });

    return {
        ...fs,
        FlagshipProvider: flagshipProvider
    };
});

describe('', () => {
    const setVisitorProfile = jest.fn<void, [string | null]>();
    const setOnSaveVisitorProfile = jest.fn<void, [(v: string) => void]>();
    Flagship.getConfig();
    const flagShip = Flagship as AugmentedFlagship;
    flagShip.setVisitorProfile = setVisitorProfile;
    flagShip.setOnSaveVisitorProfile = setOnSaveVisitorProfile;

    beforeEach(() => {
        jest.clearAllMocks();
        mockAsyncStorage.clear();
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

            const { rerender } = render(
                <FlagshipProvider {...props}>
                    <Component />
                </FlagshipProvider>
            );


            await waitFor(() => {
                // expect(reactFlagshipProvider).toBeCalledTimes(2);
                expect(reactProps.visitorCacheImplementation).toBeInstanceOf(
                    DefaultVisitorCache
                );
                expect(reactProps.hitCacheImplementation).toBeInstanceOf(
                    DefaultHitCache
                );
                // expect(reactProps.visitorData).toEqual(
                //     expect.objectContaining({
                //         ...visitorData,
                //         context: {
                //             ...visitorData.context,
                //             [OS_NAME]: Platform.OS,
                //             [OS_VERSION_CODE]: Platform.Version,
                //             [SDK_FIRST_TIME_INIT]: true
                //         }
                //     })
                // );
                // expect(setVisitorProfile).toBeCalledTimes(1);
                // expect(setVisitorProfile).toBeCalledWith(null);
                // expect(setOnSaveVisitorProfile).toBeCalledTimes(1);
            });

            // const visitorData2 = {
            //     ...visitorData,
            //     id: 'visitor_id2'
            // };

            // rerender(
            //     <FlagshipProvider {...props} visitorData={visitorData2}>
            //         <Component />
            //     </FlagshipProvider>
            // );

            // await waitFor(() => {
            //     expect(reactFlagshipProvider).toBeCalledTimes(4);
            //     expect(reactProps.visitorCacheImplementation).toBeInstanceOf(
            //         DefaultVisitorCache
            //     );
            //     expect(reactProps.hitCacheImplementation).toBeInstanceOf(
            //         DefaultHitCache
            //     );
            //     expect(reactProps.visitorData).toEqual(
            //         expect.objectContaining({
            //             ...visitorData2,
            //             context: {
            //                 ...visitorData2.context,
            //                 [OS_NAME]: Platform.OS,
            //                 [OS_VERSION_CODE]: Platform.Version,
            //                 [SDK_FIRST_TIME_INIT]: true
            //             }
            //         })
            //     );
            //     expect(setVisitorProfile).toBeCalledTimes(1);
            //     expect(setVisitorProfile).toBeCalledWith(null);
            //     expect(setOnSaveVisitorProfile).toBeCalledTimes(1);
            // });
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
                expect(setVisitorProfile).toBeCalledTimes(0);
                expect(setOnSaveVisitorProfile).toBeCalledTimes(0);
            });
        });
    });

    describe('FlagshipProvider with visitor profile', () => {
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

        let onSaveVisitorProfile: ((value: string) => void) | undefined;
        setOnSaveVisitorProfile.mockImplementation((value) => {
            onSaveVisitorProfile = value;
        });

        it('should load visitor profile form storage', async () => {
            const visitorProfile = JSON.stringify({
                anonymousId: 'anonymous_id',
                visitorId: 'visitor_id'
            });

            (mockAsyncStorage.getItem as any).mockResolvedValueOnce(
                visitorProfile
            );

            const props = {
                envId,
                apiKey,
                decisionMode: DecisionMode.DECISION_API,
                visitorData
            };
            const Component = () => <Text>children</Text>;

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
                            [SDK_FIRST_TIME_INIT]: false
                        }
                    })
                );
                expect(setVisitorProfile).toBeCalledTimes(1);
                expect(setVisitorProfile).toBeCalledWith(visitorProfile);
                expect(setOnSaveVisitorProfile).toBeCalledTimes(1);
                expect(setOnSaveVisitorProfile).toBeCalledWith(
                    onSaveVisitorProfile
                );
                expect(onSaveVisitorProfile).toBeInstanceOf(Function);
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
                            [SDK_FIRST_TIME_INIT]: false
                        }
                    })
                );
                expect(setVisitorProfile).toBeCalledTimes(1);
                expect(setOnSaveVisitorProfile).toBeCalledTimes(1);
            });
        });

        it('should save visitor profile to storage', async () => {
            const visitorProfile = JSON.stringify({
                anonymousId: 'anonymous_id',
                visitorId: 'visitor_id'
            });

            (mockAsyncStorage.getItem as any).mockResolvedValueOnce(
                visitorProfile
            );

            const props = {
                envId,
                apiKey,
                decisionMode: DecisionMode.DECISION_API,
                visitorData
            };
            const Component = () => <Text>children</Text>;

            render(
                <FlagshipProvider {...props}>
                    <Component />
                </FlagshipProvider>
            );

            const visitorProfile2 = JSON.stringify({
                anonymousId: 'anonymous_id2',
                visitorId: 'visitor_id2'
            });

            onSaveVisitorProfile!(visitorProfile2);

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
                            [SDK_FIRST_TIME_INIT]: false
                        }
                    })
                );
                expect(setVisitorProfile).toBeCalledTimes(1);
                expect(setVisitorProfile).toBeCalledWith(visitorProfile);
                expect(setOnSaveVisitorProfile).toBeCalledTimes(1);
                expect(setOnSaveVisitorProfile).toBeCalledWith(
                    onSaveVisitorProfile
                );
                expect(mockAsyncStorage.setItem).toBeCalledTimes(1);
                expect(mockAsyncStorage.setItem).toBeCalledWith(
                    CLIENT_CACHE_KEY,
                    visitorProfile2
                );
            });
        });

        it('should throw error while saving visitor profile to storage', async () => {
            const visitorProfile = JSON.stringify({
                anonymousId: 'anonymous_id',
                visitorId: 'visitor_id'
            });

            (mockAsyncStorage.getItem as any).mockResolvedValueOnce(
                visitorProfile
            );

            const props = {
                envId,
                apiKey,
                decisionMode: DecisionMode.DECISION_API,
                visitorData
            };

            (mockAsyncStorage.setItem as any).mockRejectedValueOnce(
                new Error('AsyncStorage error')
            );

            const logManager = {
                error: jest.fn()
            };

            Flagship.getConfig = jest.fn(
                () =>
                    ({
                        logManager
                    } as any)
            );

            const Component = () => <Text>children</Text>;

            render(
                <FlagshipProvider {...props}>
                    <Component />
                </FlagshipProvider>
            );

            const visitorProfile2 = JSON.stringify({
                anonymousId: 'anonymous_id2',
                visitorId: 'visitor_id2'
            });

            onSaveVisitorProfile!(visitorProfile2);

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
                            [SDK_FIRST_TIME_INIT]: false
                        }
                    })
                );
                expect(setVisitorProfile).toBeCalledTimes(1);
                expect(setVisitorProfile).toBeCalledWith(visitorProfile);
                expect(setOnSaveVisitorProfile).toBeCalledTimes(1);
                expect(setOnSaveVisitorProfile).toBeCalledWith(
                    onSaveVisitorProfile
                );
                expect(logManager.error).toBeCalledTimes(1);
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
});
