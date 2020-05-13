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
import ErrorBoundary from './lib/ErrorBoundary';
import FsLogger from './lib/FsLogger';
import { View } from 'react-native';
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
            <View>Safe mode</View>
            {children}
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
