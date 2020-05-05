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

const FlagshipProvider = ({
    children,
    envId,
    onError,
    visitorData,
    ...otherProps
}) => {
    /// Check the Envid
    if (!checkValidityPatternForEnvId(envId)) {
        if (onError) {
            onError();
        }
        return <ErrorBoundary>{children}</ErrorBoundary>;
    }

    return (
        <ReactFlagshipProvider
            {...otherProps}
            envId={envId}
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
    );
};

// Flagship Hooks
export { useFsActivate, useFsModifications, useFsSynchronize, useFlagship };

// Flagship Provider overloaded
export default FlagshipProvider;
