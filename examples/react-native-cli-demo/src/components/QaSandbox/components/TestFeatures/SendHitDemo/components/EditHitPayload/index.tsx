import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import NativeTachyons, {styles as s} from 'react-native-style-tachyons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch, useSelector} from 'react-redux';

import {updateHitPayload} from '../../../../../../../redux/stuff/demo/actions';
import {commonInputStyle} from '../../../../SdkSettings';
import {RootStackParamList} from '../../../stackContainer';

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

const EditHitPayload: React.SFC<Props> = ({navigation}) => {
  const payloadRedux = useSelector(
    (state) => state.demo.sendHit[state.demo.sendHit.selected],
  );
  const [payload, updatePayload] = React.useState(payloadRedux);
  const dispatch = useDispatch();
  const hitType = useSelector((state) => state.demo.sendHit.selected);
  return (
    <SafeAreaView>
      <ScrollView style={[s.ph3, styles.body]}>
        <View style={[]}>
          <Text style={[s.f3, s.pv3]}>Editing {hitType}:</Text>
          <View>
            {Object.keys(payload.data).map((key) => {
              return (
                <View key={key}>
                  <View style={[s.flex, s.aic, {flexDirection: 'row'}]}>
                    <Text style={[s.f5, s.pv2, s.b]}>{key}:</Text>
                    <Text style={[s.f6, {color: 'gray'}]}>{` ${typeof payload
                      .data[key]}`}</Text>
                  </View>
                  <Input
                    {...commonInputStyle}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    autoCompleteType={'off'}
                    value={(payload.data[key] || '').toString()}
                    placeholder="..."
                    onChangeText={
                      (txt) => {
                        const inputType = typeof payload.data[key];
                        updatePayload({
                          ...payload,
                          data: {
                            ...payload.data,
                            [key]: inputType === 'number' ? parseInt(txt) : txt,
                          },
                        });
                      }
                      // updateReqModif({...newReqModif, key: txt})
                    }
                    // leftIcon={<Icon name="key" {...commonIconStyle} />}
                  />
                </View>
              );
            })}
            <View style={[s.mt3]}>
              <Text style={[s.b]}>{'NOTE: '}</Text>
              <Text>
                There is no validation proceed, if value are not set correctly,
                the hit might not be considered after being sent !
              </Text>
            </View>
            <Button
              title="Save"
              containerStyle={[s.mv3]}
              buttonStyle={{backgroundColor: 'black'}}
              onPress={() => {
                dispatch(updateHitPayload({...payload}));
                navigation.goBack();
              }}
            />
          </View>
        </View>
        <View style={[{borderTopColor: 'black', borderTopWidth: 1}, s.pv2]}>
          <Button
            title="Go back"
            containerStyle={[s.mv1]}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NativeTachyons.wrap(EditHitPayload);
