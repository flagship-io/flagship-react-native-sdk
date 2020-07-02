import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import NativeTachyons, {styles as s} from 'react-native-style-tachyons';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button} from 'react-native-elements';
import {RootStackParamList} from '../../../stackContainer';
import {useFsModifications} from '@flagship.io/react-native-sdk';



interface Props {
    // Nothing
  }
  
  type ScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'GetModificationsDemo'
  >;

interface Props {
    navigation: ScreenNavigationProp;
  }

  const GetModificationInfo: React.SFC<Props> = ({navigation})=>{

      return <Button></Button>;
  };



export default NativeTachyons.wrap(GetModificationInfo);
