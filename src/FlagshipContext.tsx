import {
     FlagshipProvider as ReactFlagshipProvider,
     FlagshipProviderProps as ReactFlagshipProviderProps
} from '@flagship.io/react-sdk';
import React from 'react';
import {  DefaultHitCache } from './caches/DefaultHitCache';
import {  DefaultVisitorCache } from './caches/DefaultVisitorCache';

export interface FlagshipProviderProps extends ReactFlagshipProviderProps {}

export const FlagshipProvider: React.FC<FlagshipProviderProps> = (props) => {
    const {
        children,
        visitorCacheImplementation,
        hitCacheImplementation
    } = props;
    return (
        <ReactFlagshipProvider
            {...props}
            language = {2}
            visitorCacheImplementation={visitorCacheImplementation || new DefaultVisitorCache()}
            hitCacheImplementation={hitCacheImplementation || new DefaultHitCache()}
        >
            <>{children}</>
        </ReactFlagshipProvider>
    );
};
