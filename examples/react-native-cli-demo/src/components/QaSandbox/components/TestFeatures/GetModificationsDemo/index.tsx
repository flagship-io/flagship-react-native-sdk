import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import NativeTachyons, {styles as s} from 'react-native-style-tachyons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ScrollView} from 'react-native-gesture-handler';
import JSONTree from 'react-native-json-tree';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button} from 'react-native-elements';
import {RootStackParamList} from '../../../stackContainer';
import {useFsModifications} from '@flagship.io/react-native-sdk';
import {themeJsonTree} from '../../../../../assets/commonStyles';

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
  'GetModificationsDemo'
>;

interface Props {
  navigation: ScreenNavigationProp;
}

const GetModificationsDemo: React.SFC<Props> = ({navigation}) => {
  const params = [
    {
      key: 'color',
      defaultValue: 'green',
      activate: false,
    },
  ];
  const fsModifications = useFsModifications(params);
  return (
    <SafeAreaView>
      <ScrollView style={[s.ph3, styles.body]}>
        <Text style={[s.mt4, s.f3]}>hook argument:</Text>
        <View>
          <JSONTree data={params} theme={themeJsonTree} />
        </View>
        <Text style={[s.mt4, s.f3]}>hook output:</Text>
        <View>
          <JSONTree data={fsModifications} theme={themeJsonTree} />
        </View>
        <Text style={[s.mt4, s.f3]}>result:</Text>
        <View>
          <Text cls={fsModifications.color}>
            My color is {fsModifications.color}{' '}
            {fsModifications.color !== params[0].defaultValue &&
              'which is not my default value! :p'}
          </Text>
        </View>
        <Button
          title="Go back"
          containerStyle={[s.mv5]}
          onPress={() => {
            navigation.navigate('QaSandbox');
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NativeTachyons.wrap(GetModificationsDemo);
