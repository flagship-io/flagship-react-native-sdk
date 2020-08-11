import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import NativeTachyons, {styles as s} from 'react-native-style-tachyons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useFsSynchronize} from '@flagship.io/react-native-sdk';
import {RootStackParamList} from '../../stackContainer';
import {RootState} from '../../../../redux/rootReducer';
import {useSelector, useDispatch} from 'react-redux';
import {toggleSafeMode} from '../../../../redux/stuff/demo/actions';

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
  'SafeModeDemo'
>;

interface Props {
  navigation: ScreenNavigationProp;
}

const SafeModeDemo: React.SFC<Props> = ({navigation}) => {
  const safeModeRedux = useSelector((state: RootState) => state.demo.safeMode);
  const settingsRedux = useSelector(
    (state: RootState) => state.sdkSettings.config,
  );
  const dispatch = useDispatch();
  useFsSynchronize([safeModeRedux]);
  return (
    <SafeAreaView>
      <ScrollView style={[s.ph3, styles.body]}>
        <View style={{paddingTop: 16}}>
          {safeModeRedux.triggerTest && <Text>An error has been thrown.</Text>}
        </View>
        <View style={{paddingTop: 200}}>
          {!settingsRedux.enableErrorLayout && (
            <Text>
              NOTE: "enableErrorLayout" is set to "false" which means you won't
              see the debug banner.
            </Text>
          )}
          {settingsRedux.nodeEnv === 'production' && (
            <Text>
              NOTE: "nodeEnd" is set to "production" which means you won't see
              the debug banner.
            </Text>
          )}
          <Button
            title={
              safeModeRedux.triggerTest
                ? 'Stop simulate an error'
                : 'Simulate an error'
            }
            containerStyle={[s.mt3]}
            buttonStyle={{backgroundColor: 'red'}}
            onPress={() => {
              dispatch(toggleSafeMode(!safeModeRedux.triggerTest));
            }}
          />
          <Button
            title="Go back"
            containerStyle={[s.mv3]}
            // buttonStyle={{backgroundColor: 'black'}}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NativeTachyons.wrap(SafeModeDemo);
