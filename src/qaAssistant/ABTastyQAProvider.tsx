import React from 'react';
import { ABTastyQAEventBus } from '@flagship.io/react-sdk';

import { useMemo } from 'react';
import { ABTastyQAContext } from './ABTastyQAContext';

type ABTastyQAProviderProps = {
    children: React.ReactNode;
    isQAModeEnabled?: boolean;
    envId?: string;
    apiKey?: string;
};

export function ABTastyQAProvider({
    children,
    isQAModeEnabled,
    envId,
    apiKey
}: ABTastyQAProviderProps) {
    const ProviderValue = useMemo(
        () => ({ ABTastyQAEventBus, isQAModeEnabled, envId, apiKey }),
        [isQAModeEnabled, envId, apiKey]
    );

    return (
        <ABTastyQAContext.Provider value={ProviderValue}>
            {children}
        </ABTastyQAContext.Provider>
    );
}
