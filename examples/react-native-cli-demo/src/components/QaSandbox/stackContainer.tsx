import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import QaSandboxElement from './index';
import SdkSettings from './components/SdkSettings';
import ReduxStateInfo from './components/ReduxStateInfo';
import NewVisitorContext from './components/SdkSettings/components/NewVisitorContext';
import GetModificationsDemo from './components/TestFeatures/GetModificationsDemo';
import SendHitDemo from './components/TestFeatures/SendHitDemo';
// const styles = StyleSheet.create({});

// REACT NAVIGATION: begin
export type RootStackParamList = {
  QaSandbox: {};
  SdkSettings: {};
  CurrentSettings: {};
  NewVisitorContext: {};
  GetModificationsDemo: {};
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
        name="SendHitDemo"
        component={SendHitDemo}
        options={{title: 'useFlagship hook (send hit)'}}
      />
      {/* 3rd Level */}
      <Stack.Screen
        name="NewVisitorContext"
        component={NewVisitorContext}
        options={{title: 'Add a visitor context attribute'}}
      />
    </Stack.Navigator>
  );
};

export default DevSandbox;
