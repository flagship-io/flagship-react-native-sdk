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
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../redux/rootReducer';

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
  const params = useSelector<RootState>(
    (state) => state.demo.getModifications.params,
  );
  const fsModifications = useFsModifications(params);
  return (
    <SafeAreaView>
      <ScrollView style={[s.ph3, styles.body]}>
        {/* INPUT */}
        <View>
          <Text style={[s.mt4, s.f3]}>hook argument:</Text>
          <View>
            <JSONTree data={params} theme={themeJsonTree} />
          </View>
          <Button
            title="Edit argument"
            containerStyle={[s.mv3]}
            buttonStyle={{backgroundColor: 'black'}}
            onPress={() => {
              navigation.navigate('EditModificationsArgs');
            }}
          />
        </View>
        {/* OUTPUT */}
        <View>
          <Text style={[s.mt4, s.f3]}>hook output:</Text>
          <View>
            <JSONTree data={fsModifications} theme={themeJsonTree} />
          </View>
        </View>
        {/* RESULT */}
        <View style={[s.mb4]}>
          <Text style={[s.mt4, s.f3]}>result:</Text>
          <View>
            <Text cls={fsModifications.color}>
              My color is {fsModifications.color}{' '}
              {fsModifications.color !== params[0].defaultValue &&
                'which is not my default value! :p'}
            </Text>
          </View>
        </View>
        {/* BOTTOM MENU */}
        <View style={[{borderTopColor: 'black', borderTopWidth: 1}, s.pv2]}>
          <Button
            title="Go back"
            containerStyle={[s.mv1]}
            onPress={() => {
              navigation.navigate('QaSandbox');
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NativeTachyons.wrap(GetModificationsDemo);
