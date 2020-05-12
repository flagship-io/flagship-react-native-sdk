import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Switch} from 'react-native';
import NativeTachyons, {styles as s} from 'react-native-style-tachyons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ScrollView} from 'react-native-gesture-handler';
import JSONTree from 'react-native-json-tree';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Input, ButtonGroup, CheckBox} from 'react-native-elements';
import {RootStackParamList} from '../../../stackContainer';
import {useFsModifications} from '@flagship.io/react-native-sdk';
import {themeJsonTree} from '../../../../../assets/commonStyles';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../../../redux/rootReducer';
import {appColors} from '../../../../../../../assets/commonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  commonInputStyle,
  commonIconStyle,
} from './../../../../SdkSettings/index';

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

const EditArguments: React.SFC<Props> = ({navigation}) => {
  const params = useSelector<RootState>(
    (state) => state.demo.getModifications.params,
  );
  const [newReqModif, updateReqModif] = React.useState({
    key: null,
    defaultValue: null,
    defaultValueType: null,
    activate: false,
  });
  const types = ['boolean', 'string', 'number'];

  return (
    <SafeAreaView>
      <ScrollView style={[s.ph3, styles.body]}>
        <View>
          {/* Edit those already set: */}
          <View style={[s.flex]}>
            <Text style={[s.f3, s.pv3]}>Already set:</Text>
            <View style={[s.flex, s.jcsb]} cls="flx-row">
              <View style={[{width: '25%'}, s.pb2]}>
                <Text style={[s.f6]}>Key</Text>
              </View>
              <View style={{width: '45%'}}>
                <Text style={[s.f6]}>Default value</Text>
              </View>
              <View style={{width: '20%'}}>
                <Text style={[s.f6]}>Activate</Text>
              </View>
              <View style={{width: '10%'}} />
            </View>
            {params.map((p) => (
              <View style={[s.flex, s.jcsb, s.aic]} cls="flx-row">
                <View style={{width: '25%'}}>
                  <Text>{p.key}</Text>
                </View>
                <View style={{width: '45%'}}>
                  <Text>{p.defaultValue}</Text>
                </View>
                <View style={{width: '20%'}}>
                  <Switch
                    // trackColor={{false: appColors.red, true: appColors.green}}
                    thumbColor={p.activate ? appColors.green : appColors.red}
                    ios_backgroundColor="white"
                    onValueChange={() => {}}
                    value={p.activate}
                  />
                </View>
                <View style={{width: '10%'}}>
                  <Button
                    icon={<Icon name="times" size={12} color="white" />}
                    buttonStyle={[{backgroundColor: appColors.red}]}
                    title=""
                    onPress={() => {}}
                    containerStyle={[
                      {
                        marginTop: 6,
                        marginBottom: 6,
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
          <View style={[s.flex]}>
            <Text style={[s.f3, s.pv3]}>Add new:</Text>
            <Text style={[s.f5, s.pv2]}>Key:</Text>
            <Input
              {...commonInputStyle}
              autoCorrect={false}
              autoCapitalize={'none'}
              autoCompleteType={'off'}
              value={(newReqModif.key || '').toString()}
              placeholder="key..."
              onChangeText={(txt) => updateReqModif({...newReqModif, key: txt})}
              leftIcon={<Icon name="key" {...commonIconStyle} />}
            />
            <Text style={[s.f5, s.pv2]}>Default value:</Text>
            {newReqModif.key && (
              <ButtonGroup
                onPress={(index) => {
                  updateReqModif({
                    ...newReqModif,
                    defaultValue: null,
                    defaultValueType: types[index],
                  });
                }}
                containerStyle={[s.mv3]}
                selectedIndex={types.indexOf(newReqModif.defaultValueType)}
                buttons={types}
              />
            )}

            {newReqModif.defaultValueType &&
              newReqModif.defaultValueType === 'boolean' && (
                <View>
                  <View>
                    <Text style={[s.f6, s.pv2, s.pl2, s.b]}>
                      Default value:
                    </Text>
                  </View>
                  <CheckBox
                    title={'true'}
                    checked={!!newReqModif.defaultValue}
                    onPress={() =>
                      updateReqModif({...newReqModif, defaultValue: true})
                    }
                  />
                  <CheckBox
                    title={'false'}
                    checked={
                      newReqModif.defaultValue !== null &&
                      !newReqModif.defaultValue
                    }
                    onPress={() =>
                      updateReqModif({...newReqModif, defaultValue: false})
                    }
                  />
                </View>
              )}
            {newReqModif.defaultValueType &&
              newReqModif.defaultValueType !== 'boolean' && (
                <Input
                  {...commonInputStyle}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  autoCompleteType={'off'}
                  value={(newReqModif.defaultValue || '').toString()}
                  placeholder="value..."
                  onChangeText={(txt) =>
                    updateReqModif({
                      ...newReqModif,
                      defaultValue:
                        newReqModif.defaultValueType === 'number'
                          ? parseInt(txt)
                          : txt,
                    })
                  }
                  leftIcon={<Icon name="quote-right" {...commonIconStyle} />}
                />
              )}
            <Text style={[s.f5, s.pv2]}>Activate:</Text>
            <View>
              <CheckBox
                title={'true'}
                checked={!!newReqModif.activate}
                onPress={() => updateReqModif({...newReqModif, activate: true})}
              />
              <CheckBox
                title={'false'}
                checked={newReqModif.activate !== null && !newReqModif.activate}
                onPress={() =>
                  updateReqModif({...newReqModif, activate: false})
                }
              />
            </View>
            <Button
              title="Add"
              containerStyle={[s.mt3, s.mb3]}
              buttonStyle={{backgroundColor: 'black'}}
              onPress={() => {
                navigation.goBack();
              }}
            />
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NativeTachyons.wrap(EditArguments);
