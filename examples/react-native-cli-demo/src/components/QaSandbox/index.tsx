import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import NativeTachyons, {styles as s} from 'react-native-style-tachyons';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {RootStackParamList} from './stackContainer';
import {Button} from 'react-native-elements';
import {commonMenuButtonStyle} from '../../../src/assets/commonStyles';

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
});

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'QaSandbox'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'QaSandbox'>;

interface Props {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}

const SandboxElement: React.SFC<Props> = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.body}>
        <View style={[s.f3, s.pv3, s.tc]}>
          <Button
            {...commonMenuButtonStyle}
            title="Edit SDK Setting"
            onPress={() => navigation.navigate('SdkSettings')}
          />
          <Button
            {...commonMenuButtonStyle}
            title="See current Redux state"
            onPress={() => navigation.navigate('CurrentSettings')}
          />
          <Button
            {...commonMenuButtonStyle}
            title="Get Modifications Demo"
            onPress={() => navigation.navigate('GetModificationsDemo')}
          />
          <Button
            {...commonMenuButtonStyle}
            title="Send Hit Demo"
            onPress={() => navigation.navigate('SendHitDemo')}
          />
          <Button
            {...commonMenuButtonStyle}
            title="Safe Mode Demo"
            onPress={() => navigation.navigate('SafeModeDemo')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NativeTachyons.wrap(SandboxElement);
