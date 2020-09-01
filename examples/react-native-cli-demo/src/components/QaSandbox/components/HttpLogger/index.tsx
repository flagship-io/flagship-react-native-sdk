import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import NativeTachyons, {styles as s} from 'react-native-style-tachyons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import NetworkLogger from 'react-native-network-logger';

import {RootStackParamList} from '../../stackContainer';

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
});

interface Props {
  // Nothing
}

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HttpLogger'
>;

interface Props {
  navigation: ScreenNavigationProp;
}

const HttpLogger: React.SFC<Props> = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView style={[s.ph3, styles.body]}>
        <NetworkLogger />
        <Button
          title="Go back"
          containerStyle={[s.mv2]}
          onPress={() => {
            navigation.navigate('QaSandbox');
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NativeTachyons.wrap(HttpLogger);
