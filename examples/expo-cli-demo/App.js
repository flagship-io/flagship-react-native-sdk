import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FlagshipProvider from '@flagship.io/react-native-sdk';
import Container from './src/Container';
import { StatusBar } from 'react-native';
import FlagshipLoading from './src/FlagshipLoading';

export default function App() {
    const [state, setState] = React.useState({ isVip: true, isAuth: true });

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <FlagshipProvider
                envId="bn1ab7m56qolupi5sa0g"
                visitorData={{
                    id: null,
                    context: { ...state }
                }}
                nodeEnv="development"
                config={{
                    fetchNow: true,
                    enableConsoleLogs: true
                }}
                loadingComponent={<FlagshipLoading />}
            >
                <Container
                    state={state}
                    onStateChange={(newState) => setState({ ...newState })}
                />
            </FlagshipProvider>
        </>
    );
}
