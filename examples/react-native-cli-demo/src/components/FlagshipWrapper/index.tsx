import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import FlagshipProvider from '@flagship.io/react-native-sdk';
import {useSelector, useDispatch} from 'react-redux';
import {View, Image, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import QaSbStackContainer from '../QaSandbox/stackContainer';
import Home from '../Home';
import {RootState} from '../../redux/rootReducer';
import {setFsModifications} from '../../redux/stuff/sdkSettings/actions';
import {SafeAreaView} from 'react-native-safe-area-context';
import NativeTachyons, {styles as s} from 'react-native-style-tachyons';

// REACT NAVIGATION: begin
const Tab = createBottomTabNavigator();

const FlagshipWrapper = () => {
  const FsLoadingProvider = () => (
    <View style={[s.flex, s.jcc, s.asc, {height: '100%'}]}>
      <Text style={[s.f4]}>Loading...</Text>
    </View>
  );
  const sdkSettings = useSelector((state: RootState) => state.sdkSettings);
  const safeModeRedux = useSelector((state: RootState) => state.demo.safeMode);
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
        if (safeModeRedux.triggerTest) {
          throw new Error('Crash test react native');
        }
      }}
      config={{...sdkSettings.config}}
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
