import 'react-native-gesture-handler';

import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import thunkMiddleware from 'redux-thunk';

import FlagshipWrapper from './src/components/FlagshipWrapper';
import rootReducer from './src/redux/rootReducer';

declare let global: {HermesInternal: null | {}};

// REDUX STORE: begin

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewareEnhancer = applyMiddleware(thunkMiddleware);
const store = createStore(
  persistedReducer,
  undefined,
  compose(middlewareEnhancer),
);
export const persister = persistStore(store);
// REDUX STORE: end

export type RootTabParamList = {
  Sandbox: {};
  Home: {};
};
// REACT NAVIGATION: end

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={{}}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persister}>
            <StatusBar barStyle="dark-content" />
            <FlagshipWrapper />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
