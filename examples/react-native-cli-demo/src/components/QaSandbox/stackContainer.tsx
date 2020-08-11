import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import QaSandboxElement from './index';
import SdkSettings from './components/SdkSettings';
import ReduxStateInfo from './components/ReduxStateInfo';
import NewVisitorContext from './components/SdkSettings/components/NewVisitorContext';
import GetModificationsDemo from './components/TestFeatures/GetModificationsDemo';
import SendHitDemo from './components/UseFlagshipDemo/components/SendHitDemo';
import EditArguments from './components/TestFeatures/GetModificationsDemo/components/EditArguments';
import EditHitPayload from './components/UseFlagshipDemo/components/SendHitDemo/components/EditHitPayload';
import SafeModeDemo from './components/TestFeatures/SafeModeDemo';

import GetModificationInfo from './components/UseFlagshipDemo/components/GetModificationInfo';
import HttpLogger from './components/HttpLogger';
import UseFlagshipDemo from './components/UseFlagshipDemo';

// const styles = StyleSheet.create({});

export type NewVisitorContextParams = {
  key: string;
  type: 'string' | 'boolean' | 'number';
  value: any;
};

// REACT NAVIGATION: begin
export type RootStackParamList = {
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // 1st Level
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  QaSandbox: {};
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // 2nd Level
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  SdkSettings: {};
  CurrentSettings: {};
  UseFsModificationsDemo: {};
  UseFlagshipDemo: {};
  SafeModeDemo: {};
  HttpLogger: {};
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // 3rd Level
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  NewVisitorContext: NewVisitorContextParams;
  EditModificationsArgs: {};
  EditHitPayload: {};
  GetModificationsDemo: {};
  GetModificationInfo: {};
  SendHitDemo: {};
};
const Stack = createStackNavigator<RootStackParamList>();
// REACT NAVIGATION: end

interface Props {
  // Nothing
}

const DevSandbox: React.SFC<Props> = () => {
  // const {name} = route.params;
  return (
    <Stack.Navigator initialRouteName="QaSandbox">
      {/*
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      1st Level
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
       */}
      <Stack.Screen
        name="QaSandbox"
        component={QaSandboxElement}
        options={{title: 'QA Sandbox View'}}
      />
      {/* 
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      2nd Level
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
       */}
      <Stack.Screen
        name="SdkSettings"
        component={SdkSettings}
        options={{title: 'Sdk Settings View'}}
      />
      <Stack.Screen
        name="CurrentSettings"
        component={ReduxStateInfo}
        options={{title: 'Redux state'}}
      />
      <Stack.Screen
        name="UseFsModificationsDemo"
        component={GetModificationsDemo}
        options={{title: 'useFsModifications Demo'}}
      />
      <Stack.Screen
        name="UseFlagshipDemo"
        component={UseFlagshipDemo}
        options={{title: 'useFlagship Demo'}}
      />
      <Stack.Screen
        name="SafeModeDemo"
        component={SafeModeDemo}
        options={{title: 'Safe Mode'}}
      />
      <Stack.Screen
        name="HttpLogger"
        component={HttpLogger}
        options={{title: 'Http network'}}
      />
      {/*
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      3rd Level
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
       */}
      <Stack.Screen
        name="NewVisitorContext"
        component={NewVisitorContext}
        options={{title: 'Add a visitor context attribute'}}
      />
      <Stack.Screen
        name="EditModificationsArgs"
        component={EditArguments}
        options={{title: 'Modify arguments'}}
      />
      <Stack.Screen
        name="EditHitPayload"
        component={EditHitPayload}
        options={{title: 'Modify hit payload'}}
      />
      <Stack.Screen
        name="GetModificationInfo"
        component={GetModificationInfo}
        options={{title: 'getModificationInfo'}}
      />
      <Stack.Screen
        name="SendHitDemo"
        component={SendHitDemo}
        options={{title: 'Send hit demo'}}
      />
    </Stack.Navigator>
  );
};

export default DevSandbox;
