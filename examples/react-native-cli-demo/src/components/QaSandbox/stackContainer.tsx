import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import QaSandboxElement from './index';
import SdkSettings from './components/SdkSettings';
import ReduxStateInfo from './components/ReduxStateInfo';
import NewVisitorContext from './components/SdkSettings/components/NewVisitorContext';
import GetModificationsDemo from './components/TestFeatures/GetModificationsDemo';
import SendHitDemo from './components/TestFeatures/SendHitDemo';
import EditArguments from './components/TestFeatures/GetModificationsDemo/components/EditArguments';
import EditHitPayload from './components/TestFeatures/SendHitDemo/components/EditHitPayload';
import SafeModeDemo from './components/TestFeatures/SafeModeDemo';

import GetModificationInfo from './components/TestFeatures/GetModificationsDemo/components/GetModificationInfo';
import HttpLogger from './components/HttpLogger';

// const styles = StyleSheet.create({});

export type NewVisitorContextParams = {
  key: string;
  type: 'string' | 'boolean' | 'number';
  value: any;
};

// REACT NAVIGATION: begin
export type RootStackParamList = {
  QaSandbox: {};
  SdkSettings: {};
  CurrentSettings: {};
  NewVisitorContext: NewVisitorContextParams;
  GetModificationsDemo: {};
  SendHitDemo: {};
  EditModificationsArgs: {};
  EditHitPayload: {};
  SafeModeDemo: {};
  GetModificationInfo: {};
  HttpLogger: {};
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
      {/* 1st Level */}
      <Stack.Screen
        name="QaSandbox"
        component={QaSandboxElement}
        options={{title: 'QA Sandbox View'}}
      />
      {/* 2nd Level */}
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
        name="GetModificationsDemo"
        component={GetModificationsDemo}
        options={{title: 'useFsModifications hook'}}
      />
      <Stack.Screen
        name="HttpLogger"
        component={HttpLogger}
        options={{title: 'Http network'}}
      />
      <Stack.Screen
        name="SendHitDemo"
        component={SendHitDemo}
        options={{title: 'useFlagship hook (send hit)'}}
      />
      <Stack.Screen
        name="SafeModeDemo"
        component={SafeModeDemo}
        options={{title: 'Safe Mode'}}
      />
      {/* 3rd Level */}
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
    </Stack.Navigator>
  );
};

export default DevSandbox;
