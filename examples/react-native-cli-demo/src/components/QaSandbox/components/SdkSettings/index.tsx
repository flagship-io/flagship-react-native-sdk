import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Switch, Text} from 'react-native';
import {Button, Input, CheckBox} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import NativeTachyons, {styles as s} from 'react-native-style-tachyons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch, useSelector} from 'react-redux';

import {storeData} from '../../../../../src/lib/localStorage';
import commonStyles, {appColors} from '../../../../assets/commonStyles';
import {RootStackParamList} from '../..//stackContainer';
import {
  setEnvIdAction,
  setVisitorIdAction,
  updateConfig,
} from './../../../../redux//stuff/sdkSettings/actions';
import VisitorSettings from './components/VisitorSettings';
import {RootState} from '../../../../redux/rootReducer';

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
  labelColor: {
    color: appColors.grey,
  },
});

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SdkSettings'
>;

interface Props {
  navigation: ScreenNavigationProp;
}

export const commonInputStyle = {
  inputContainerStyle: [s.mb3],
  labelStyle: [s.mt3, styles.labelColor],
  inputStyle: [s.red],
  leftIconContainerStyle: [s.mr3],
  placeholderTextColor: appColors.grey,
};

export const commonIconStyle = {
  size: 16,
  color: appColors.dark,
};

const SdkSettings: React.SFC<Props> = ({navigation}) => {
  //   const mySomethingState = useSelector(state => state.something);
  const dispatch = useDispatch();

  const visitorContext = useSelector(
    (state: RootState) => state.sdkSettings.visitorContext,
  );

  console.log('visitorContext : ', visitorContext);

  const stateEnvId = useSelector((state: RootState) => state.sdkSettings.envId);
  const stateVisId = useSelector(
    (state: RootState) => state.sdkSettings.visitorId,
  );
  const stateConfig = useSelector(
    (state: RootState) => state.sdkSettings.config,
  );
  const [envId, setEnvId] = React.useState<string | undefined>(undefined);
  const [visId, setVisitorId] = React.useState<string | undefined>(undefined);
  const [config, updateLocalConfig] = React.useState(stateConfig);

  useEffect(() => {
    setEnvId(stateEnvId);
    setVisitorId(stateVisId);
  }, [stateEnvId, stateVisId]);

  return (
    <SafeAreaView>
      <ScrollView style={[s.ph3, styles.body]}>
        <Input
          {...commonInputStyle}
          containerStyle={{marginTop: 10}}
          label="Env ID"
          autoCorrect={false}
          autoCapitalize={'none'}
          autoCompleteType={'off'}
          placeholder="Your environment ID"
          value={envId}
          onChangeText={(txt) => setEnvId(txt)}
          leftIcon={<Icon name="envira" {...commonIconStyle} />}
        />

        <VisitorSettings
          visitorId={visId}
          onChangeVisId={(txt) => setVisitorId(txt)}
          navigation={navigation}
        />

        {/* Config Settings */}
        <View
          style={[s.flex, s.mv2, s.ph2, s.jcsb, s.aic, {flexDirection: 'row'}]}>
          <Text style={[s.f5]}>fetchNow:</Text>
          <Switch
            thumbColor={config.fetchNow ? 'white' : appColors.red}
            ios_backgroundColor="white"
            onValueChange={() => {
              updateLocalConfig({...config, fetchNow: !config.fetchNow});
            }}
            value={!!config.fetchNow}
          />
        </View>
        <View
          style={[s.flex, s.mv2, s.ph2, s.jcsb, s.aic, {flexDirection: 'row'}]}>
          <Text style={[s.f5]}>activateNow:</Text>
          <Switch
            thumbColor={config.activateNow ? 'white' : appColors.red}
            ios_backgroundColor="white"
            onValueChange={() => {
              updateLocalConfig({...config, activateNow: !config.activateNow});
            }}
            value={!!config.activateNow}
          />
        </View>
        <View
          style={[s.flex, s.mv2, s.ph2, s.jcsb, s.aic, {flexDirection: 'row'}]}>
          <Text style={[s.f5]}>enableConsoleLogs:</Text>
          <Switch
            thumbColor={config.enableConsoleLogs ? 'white' : appColors.red}
            ios_backgroundColor="white"
            onValueChange={() => {
              updateLocalConfig({
                ...config,
                enableConsoleLogs: !config.enableConsoleLogs,
              });
            }}
            value={!!config.enableConsoleLogs}
          />
        </View>
        <View
          style={[s.flex, s.mv2, s.ph2, s.jcsb, s.aic, {flexDirection: 'row'}]}>
          <Text style={[s.f5]}>enableErrorLayout:</Text>
          <Switch
            thumbColor={config.enableErrorLayout ? 'white' : appColors.red}
            ios_backgroundColor="white"
            onValueChange={() => {
              updateLocalConfig({
                ...config,
                enableErrorLayout: !config.enableErrorLayout,
              });
            }}
            value={!!config.enableErrorLayout}
          />
        </View>
        <View style={[s.mv2, s.ph2]}>
          <Text style={[s.f5, s.mb2]}>nodeEnv:</Text>
          <CheckBox
            title={'production'}
            checked={config.nodeEnv === 'production'}
            onPress={() =>
              updateLocalConfig({
                ...config,
                nodeEnv: 'production',
              })
            }
          />
          <CheckBox
            title={'development'}
            checked={config.nodeEnv === 'development'}
            onPress={() =>
              updateLocalConfig({
                ...config,
                nodeEnv: 'development',
              })
            }
          />
        </View>
        <Button
          title="Save settings"
          containerStyle={[s.mt5, s.mb4]}
          onPress={() => {
            console.log(envId);
            storeData('envId', "envId || ''");
            storeData('visId', "visId || ''");
            storeData('visContext', 'visitorContext.toString()');
            dispatch(setEnvIdAction(envId as string));
            dispatch(setVisitorIdAction(visId as string));
            dispatch(updateConfig(config));
            navigation.navigate('QaSandbox');
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NativeTachyons.wrap(SdkSettings);
