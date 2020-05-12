import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import NativeTachyons, {styles as s} from 'react-native-style-tachyons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ScrollView} from 'react-native-gesture-handler';
import JSONTree from 'react-native-json-tree';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, CheckBox, Overlay} from 'react-native-elements';
import {RootStackParamList} from '../../../stackContainer';
import {useFlagship} from '@flagship.io/react-native-sdk';
import {themeJsonTree} from '../../../../../assets/commonStyles';
import hit from '../../../../../mock/hit';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../../../redux/rootReducer';
import {setCurrentHitSelected} from '../../../../../redux/stuff/demo/actions';

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

const SendHitDemo: React.SFC<Props> = ({navigation}) => {
  const {hit: fsHit} = useFlagship();
  const hitInfo = useSelector<RootState>((state) => state.demo.sendHit);
  const dispatch = useDispatch();
  const [isHitSent, toggleHitSend] = React.useState(false);
  return (
    <SafeAreaView>
      <ScrollView style={[s.ph3, styles.body]}>
        <Overlay
          isVisible={isHitSent}
          overlayStyle={{
            height: '30%',
            width: '80%',
          }}
          onBackdropPress={() => {
            toggleHitSend(false);
          }}>
          <View style={[s.flex, s.jcsb, {height: '100%'}]}>
            <Text style={[s.f4]}>The hit has been sent.</Text>
            <Text style={[s.f6]}>
              Please check logs to see if it's succeed or failed.
            </Text>
            <Button
              title="Ok"
              containerStyle={[s.mv3]}
              onPress={() => {
                toggleHitSend(false);
              }}
            />
          </View>
        </Overlay>
        <View style={[s.pv2]}>
          <View>
            <Text style={[s.f6, s.pv2, s.pl2, s.b]}>Hit type:</Text>
          </View>
          <CheckBox
            title={'transaction'}
            checked={hitInfo.selected === 'transaction'}
            onPress={() => dispatch(setCurrentHitSelected('transaction'))}
          />
          <CheckBox
            title={'screen'}
            checked={hitInfo.selected === 'screen'}
            onPress={() => dispatch(setCurrentHitSelected('screen'))}
          />
          <CheckBox
            title={'item'}
            checked={hitInfo.selected === 'item'}
            onPress={() => dispatch(setCurrentHitSelected('item'))}
          />
          <CheckBox
            title={'event'}
            checked={hitInfo.selected === 'event'}
            onPress={() => dispatch(setCurrentHitSelected('event'))}
          />
        </View>
        {hitInfo.selected && (
          <View>
            <View>
              <Text style={[s.f6, s.pv2, s.pl2, s.b]}>Hit payload:</Text>
              <JSONTree
                data={hitInfo[hitInfo.selected]}
                theme={themeJsonTree}
              />
            </View>
            <Button
              title="Edit hit payload"
              containerStyle={[s.mv3]}
              buttonStyle={{backgroundColor: 'black'}}
              onPress={() => {
                navigation.navigate('EditHitPayload');
              }}
            />
          </View>
        )}
        <View style={[{borderTopColor: 'black', borderTopWidth: 1}, s.pv4]}>
          {hitInfo.selected && (
            <Button
              title="Send Hit"
              containerStyle={[s.mv1]}
              buttonStyle={{backgroundColor: 'orange'}}
              onPress={() => {
                fsHit.send(hitInfo[hitInfo.selected]);
                toggleHitSend(true);
              }}
            />
          )}
          <Button
            title="Go back"
            containerStyle={[s.mv3]}
            onPress={() => {
              navigation.navigate('QaSandbox');
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NativeTachyons.wrap(SendHitDemo);
