import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import NativeTachyons, {styles as s} from 'react-native-style-tachyons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ScrollView} from 'react-native-gesture-handler';
import JSONTree from 'react-native-json-tree';
import {RootStackParamList} from '../../stackContainer';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button} from 'react-native-elements';
import {themeJsonTree} from '../../../../assets/commonStyles';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';

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
  'CurrentSettings'
>;

interface Props {
  navigation: ScreenNavigationProp;
}

const ReduxStateInfo: React.SFC<Props> = ({navigation}) => {
  const sdkSettings = useSelector((state: RootState) => state.sdkSettings);
  return (
    <SafeAreaView>
      <ScrollView style={[s.ph3, styles.body]}>
        <Text style={[s.mt4, s.f3]}>state.sdkSettings:</Text>
        <View>
          <JSONTree data={sdkSettings} theme={themeJsonTree} />
        </View>
        <Button
          title="Ok"
          containerStyle={[s.mv5]}
          onPress={() => {
            navigation.navigate('QaSandbox');
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NativeTachyons.wrap(ReduxStateInfo);
