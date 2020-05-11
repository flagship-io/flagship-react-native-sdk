import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import NativeTachyons, { styles as s } from 'react-native-style-tachyons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles, { appColors } from '../../../../assets/commonStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../..//stackContainer';
import {
    setEnvIdAction,
    setVisitorIdAction
} from './../../../../redux//stuff/sdkSettings/actions';
import VisitorSettings from './components/VisitorSettings';
import { storeData } from '../../../../../src/lib/localStorage';
import { RootState } from 'src/redux/rootReducer';

const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.white
    },
    labelColor: {
        color: appColors.grey
    }
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
    placeholderTextColor: appColors.grey
};

export const commonIconStyle = {
    size: 16,
    color: appColors.dark
};

const SdkSettings: React.SFC<Props> = ({ navigation }) => {
    //   const mySomethingState = useSelector(state => state.something);
    const dispatch = useDispatch();

    const visitorContext = useSelector(
        (state: RootState) => state.sdkSettings.visitorContext
    );

    console.log('visitorContext : ', visitorContext);

    const stateEnvId = useSelector(
        (state: RootState) => state.sdkSettings.envId
    );
    const stateVisId = useSelector(
        (state: RootState) => state.sdkSettings.visitorId
    );
    const [envId, setEnvId] = React.useState<string | undefined>(undefined);
    const [visId, setVisitorId] = React.useState<string | undefined>(undefined);

    useEffect(() => {
        setEnvId(stateEnvId);
        setVisitorId(stateVisId);
    }, [stateEnvId, stateVisId]);

    return (
        <SafeAreaView>
            <ScrollView style={[s.ph3, styles.body]}>
                <Input
                    {...commonInputStyle}
                    containerStyle={{ marginTop: 10 }}
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
                        navigation.navigate('QaSandbox');
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default NativeTachyons.wrap(SdkSettings);
