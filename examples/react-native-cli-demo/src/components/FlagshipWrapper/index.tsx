import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import FlagshipProvider from '@flagship.io/react-native-sdk';
import {useSelector, useDispatch} from 'react-redux';
import {View} from 'react-native';
import {Text} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import QaSbStackContainer from '../QaSandbox/stackContainer';
import Home from '../Home';
import {RootState} from '../../redux/rootReducer';
import {setFsModifications} from '../../redux/stuff/sdkSettings/actions';

// REACT NAVIGATION: begin
const Tab = createBottomTabNavigator();

const FlagshipWrapper = () => {
  const FsLoadingProvider = () => (
    <View>
      <Text>Loading...</Text>
    </View>
  );
  const sdkSettings = useSelector((state: RootState) => state.sdkSettings);

  const dispatch = useDispatch();
  const context: {[key: string]: number | boolean | string} = {};
  sdkSettings.visitorContext.forEach(({key, value}) => {
    context[key] = value;
  });
  return (
    <FlagshipProvider
      envId={sdkSettings.envId || ''}
      onUpdate={({fsModifications}) => {
        dispatch(setFsModifications(fsModifications));
      }}
      config={{
        fetchNow: true,
        enableConsoleLogs: true,
      }}
      onInitStart={() => {
        console.log('init start');
      }}
      onInitDone={() => {
        console.log('init done');
      }}
      visitorData={{
        id: sdkSettings.visitorId || '',
        context,
      }}
      loadingComponent={<FsLoadingProvider />}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="QA Sandbox"
            component={QaSbStackContainer}
            options={{
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="settings"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </FlagshipProvider>
  );
};

export default FlagshipWrapper;
