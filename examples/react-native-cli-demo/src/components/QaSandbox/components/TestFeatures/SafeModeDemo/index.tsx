import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import NativeTachyons, {styles as s} from 'react-native-style-tachyons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useFsSynchronize} from '@flagship.io/react-native-sdk';
import {RootStackParamList} from '../../../stackContainer';
import {RootState} from '../../../../../redux/rootReducer';
import {useSelector, useDispatch} from 'react-redux';
import {toggleSafeMode} from '../../../../../redux/stuff/demo/actions';

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
  const dispatch = useDispatch();
  useFsSynchronize([safeModeRedux]);
  return (
    <SafeAreaView>
      <ScrollView style={[s.ph3, styles.body]}>
        <View style={{paddingTop: 200}}>
          {safeModeRedux.triggerTest && (
            <Text>An error has been thrown. Safe mode should be enabled.</Text>
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
