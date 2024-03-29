/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Configuration from '../screens/Configuration';
import GetFlag from '../screens/GetFlag';
import HitsScreen from '../screens/HitsScreen';
import HttpLogScreen from '../screens/HttpLogScreen';
import SdkLoggerScreen from '../screens/SdkLoggerScreen';
import UserScreen from '../screens/UserScreen';
import { RootStackParamList, RootTabParamList } from '../types';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Configuration"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Configuration"
        component={Configuration}
        options={() => ({
          title: 'Configuration',
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />
        })}
      />
      <BottomTab.Screen
        name="User"
        component={UserScreen}
        options={{
          title: 'Visitor',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
       <BottomTab.Screen
        name="GetFlag"
        component={GetFlag}
        options={{
          title: 'GetFlag',
          tabBarIcon: ({ color }) => <TabBarIcon name='flag' color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Hits"
        component={HitsScreen}
        options={{
          title: 'Hits',
          tabBarIcon: ({ color }) => <TabBarIcon name='bullseye' color={color} />,
        }}
      />
      <BottomTab.Screen
        name="SdkLogs"
        component={SdkLoggerScreen}
        options={{
          title: 'Sdk logs',
          tabBarIcon: ({ color }) => <TabBarIcon  name="file" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="HttpLog"
        component={HttpLogScreen}
        options={{
          title: 'Http logs',
          tabBarIcon: ({ color }) => <TabBarIcon name='wifi' color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
