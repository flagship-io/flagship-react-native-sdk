import React from 'react';
import {
    FlagshipProvider as ReactFlagshipProvider,
    useFsModifications,
    useFsActivate,
    useFsSynchronize,
    useFlagship
} from '@flagship.io/react-sdk';

import {
    generateFlagshipId,
    checkValidityPatternForEnvId

} from './lib/FSTools';

import {
    getCacheFromPhone,
    setCacheFromPhone
} from './lib/FSStorage';

import ErrorBoundary from './lib/ErrorBoundary';
import FsLogger from './lib/FsLogger';
import { View, Text, SafeAreaView, Button } from 'react-native';
const initState = {
    log: null
};

const FsReactNativeContext = React.createContext({
    state: { ...initState },
    setState: null
});

const displayReactNativeBoundary = ({
    debugMode,
    children,
    isCollapse,
    error,
    onClickCollapse
}) => {
    return (
        <>
            {debugMode && (
                <SafeAreaView>
                    <View
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingTop: 8,
                            paddingBottom: 16,
                            backgroundColor: 'red'
                        }}
                    >
                        <Text style={{ color: 'white', fontSize: 16 }} />
                        <Button
                            onPress={onClickCollapse}
                            title={isCollapse ? 'Close view' : 'Safe mode: ON'}
                            color="white"
                        />
                    </View>
                    {isCollapse && (
                        <View>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    marginTop: 16
                                }}
                            >
                                Details:
                            </Text>
                            <Text style={{ marginTop: 8 }}>{error.stack}</Text>
                        </View>
                    )}
                </SafeAreaView>
            )}
            {!isCollapse && children}
        </>
    );
};

const FlagshipProvider = ({
    children,
    envId,
    onError,
    config,
    visitorData,
    ...otherProps
}) => {
    const [state, setState] = React.useState({
        ...initState,
        log: FsLogger.getLogger(config)
    });

    // Check the envId
    if (!checkValidityPatternForEnvId(envId)) {
        if (onError) {
            onError();
        }
        return <ErrorBoundary>{children}</ErrorBoundary>;
    }

    return (
        <FsReactNativeContext.Provider value={{ state, setState }}>
            <ReactFlagshipProvider
                {...otherProps}
                envId={envId}
                config={config}
                reactNative={{
                    handleErrorDisplay: displayReactNativeBoundary
                }}
                visitorData={{
                    /// Check the visitor id is null ?
                    id:
                        visitorData.id == null
                            ? generateFlagshipId()
                            : visitorData.id,
                    context: visitorData.context
                }}
                /// Set the cache
                onUpdate = {()=>{
                    setCacheFromPhone()
                }
                }
                /// Provide the cache at the start 
                initialModifications = {
                    getCacheFromPhone()
                }
            >
                {children}
            </ReactFlagshipProvider>
        </FsReactNativeContext.Provider>
    );
};

// Flagship react native consumer
export const FsReactNativeConsumer = FsReactNativeContext.Consumer;

// Flagship Hooks
export { useFsActivate, useFsModifications, useFsSynchronize, useFlagship };

// Flagship Provider overloaded
export default FlagshipProvider;
