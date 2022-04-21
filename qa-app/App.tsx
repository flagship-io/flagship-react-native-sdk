import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { FlagshipProvider } from "@flagship.io/react-native-sdk";
import React, { useState } from 'react';
import { appContext, AppState, defaultContext } from './context/AppContext';
import { startNetworkLogging } from 'react-native-network-logger';
import { CustomLogger } from './utils/CustomLogger';

startNetworkLogging()

export default function App() {

  const [appState, setAppState] = useState<AppState>(defaultContext.state);
  
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <appContext.Provider 
        value={{state:appState, setState:setAppState}}>
        <FlagshipProvider
          envId={appState.envId}
          apiKey={appState.apiKey}
          decisionMode={appState.decisionMode}
          timeout={appState.timeout}
          visitorData={appState.visitorData}
          logManager={new CustomLogger(setAppState)}
        >
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
        </FlagshipProvider>
        </appContext.Provider>
      </SafeAreaProvider>
    );
  }
}
