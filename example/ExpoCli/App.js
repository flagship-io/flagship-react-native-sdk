import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FlagshipProvider from '@flagship.io/react-native-sdk';
import Container from './src/Container';
import FlagshipLoading from './src/FlagshipLoading';

export default function App() {
    return (
        <FlagshipProvider
            envId="your envId"
            visitorData={{
                id: 'bqjfsd6irtfg02cm79jg',
                context: { isVip: true, isAuth: true }
            }}
            config={{
                fetchNow: true,
                enableConsoleLogs: true
            }}
            loadingComponent={<FlagshipLoading />}
        >
            <Container />
        </FlagshipProvider>
    );
}
