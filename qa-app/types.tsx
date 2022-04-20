/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { DecisionMode } from '@flagship.io/react-native-sdk';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Configuration: undefined;
  User: undefined;
  GetFlag: undefined;
  HttpLog: undefined;
  Hits: undefined
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type Config = {
  envId?: string;
  apiKey?: string;
  decisionMode?: DecisionMode;
  timeout: number
  visitorId?: string
  isAuthenticated?:boolean
  hasConsented?: boolean
  context?: string
};

export interface LineContainerInputTextProps {
  label?: string
  value?: string;
  placeHolder?: string;
  onChangeText: (text: string) => void;
}

export interface LineContainerInputTextReadyOnlyProps {
  label?: string
  value?: string;
  height?:number
}

export interface LineContainerInputSwitchProps {
  label?: string
  value?: boolean;
  onValueChange: (value: boolean) => void;
}
