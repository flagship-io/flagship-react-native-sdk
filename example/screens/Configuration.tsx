import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet } from 'react-native';
import { Text, View, Button, TextInput, useThemeColor } from '../components/Themed';
import globalStyles from '../constants/GlobalStyles';
import {
    DecisionMode,
    FlagshipStatus,
    useFlagship
} from '@flagship.io/react-native-sdk';
import { Picker } from '@react-native-picker/picker';
import { appContext } from '../context/AppContext';
import { Config } from '../types';
import LineContainerInputText from '../components/LineContainerInputText';
import LineContainerSwitch from '../components/LineContainerSwitch';
import ContextModal from '../components/ContextModal';
import { FontAwesome } from '@expo/vector-icons';

export default function ConfigurationScreen() {
    const [config, setConfig] = useState<Config>({
        context: {},
        timeout: 2,
        hasConsented: true,
        showModal: false
    });

    const { state, setState } = useContext(appContext);

    const textColor = useThemeColor({}, 'text');

    const fs = useFlagship();

    useEffect(() => {
        setConfig((prev) => ({
            ...prev,
            context: fs.context
        }));
    }, [JSON.stringify(fs.context)]);

    useEffect(() => {
        let context = {};
        try {
            context = state.visitorData.context || {};
        } catch (error) {}

        setConfig({
            envId: state.envId,
            apiKey: state.apiKey,
            decisionMode: state.decisionMode,
            timeout: state.timeout,
            visitorId: state.visitorData.id,
            isAuthenticated: state.visitorData.isAuthenticated,
            hasConsented: state.visitorData.hasConsented,
            context,
            showModal: false
        });
    }, [JSON.stringify(state)]);

    const onResetPress = () => {
        setConfig({
            context: {},
            timeout: 2,
            hasConsented: true,
            decisionMode: DecisionMode.DECISION_API,
            showModal: false
        });
    };

    const onStartPress = () => {
        if (!setState) {
            return;
        }
        let context = {};
        try {
            context = config.context || {};
        } catch (error) {}

        setState((prev) => ({
            ...prev,
            apiKey: config.apiKey || '',
            envId: config.envId || '',
            decisionMode: config.decisionMode,
            timeout: config.timeout,
            visitorData: {
                ...prev.visitorData,
                id: config.visitorId,
                context: context,
                isAuthenticated: config.isAuthenticated,
                hasConsented: config.hasConsented
            }
        }));
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.containerResetButton}>
                <Text>SDK Status: {FlagshipStatus[state.status]}</Text>
                <Button title="Reset" onPress={onResetPress} />
            </View>

            <LineContainerInputText
                label={'Env ID'}
                value={config.envId}
                onChangeText={useCallback(
                    (text) => {
                        setConfig((prev) => ({ ...prev, envId: text }));
                    },
                    [config.envId]
                )}
                placeHolder={'Put the env ID'}
            />

            <LineContainerInputText
                label={'Api key'}
                value={config.apiKey}
                onChangeText={useCallback(
                    (text) => {
                        setConfig((prev) => ({ ...prev, apiKey: text }));
                    },
                    [config.apiKey]
                )}
                placeHolder={'Put the api key'}
            />

            <View style={styles.lineContainer}>
                <Text style={styles.lineLabel}>Decision Mode</Text>
                <Picker
                    style={[styles.lineInputText, styles.picker]}
                    selectedValue={config.decisionMode}
                    onValueChange={(itemValue) =>
                        setConfig((prev) => ({
                            ...prev,
                            decisionMode: itemValue
                        }))
                    }
                >
                    <Picker.Item
                        label="API"
                        value={DecisionMode.DECISION_API}
                    />
                    <Picker.Item
                        label="BUCKETING"
                        value={DecisionMode.BUCKETING}
                    />
                </Picker>
            </View>

            <LineContainerInputText
                label={'Timeout (sec)'}
                value={`${config.timeout}`}
                onChangeText={useCallback(
                    (text) => {
                        setConfig((prev) => ({
                            ...prev,
                            timeout: Number(text)
                        }));
                    },
                    [config.timeout]
                )}
                placeHolder={'Put the time'}
            />

            <LineContainerInputText
                label={'Visitor id'}
                value={config.visitorId}
                onChangeText={useCallback(
                    (text) => {
                        setConfig((prev) => ({ ...prev, visitorId: text }));
                    },
                    [config.visitorId]
                )}
                placeHolder={'Put the visitor ID'}
            />

            <LineContainerSwitch
                label={'Authenticated'}
                value={config.isAuthenticated}
                onValueChange={useCallback(
                    (isAuthenticated) => {
                        setConfig((prev) => ({ ...prev, isAuthenticated }));
                    },
                    [config.isAuthenticated]
                )}
            />

            <LineContainerSwitch
                label={'Consent'}
                value={config.hasConsented}
                onValueChange={useCallback(
                    (hasConsented) => {
                        setConfig((prev) => ({ ...prev, hasConsented }));
                    },
                    [config.hasConsented]
                )}
            />

            <Modal animationType="slide" visible={config.showModal}>
                <ContextModal
                    context={config.context}
                    onUpdated={useCallback(
                        (context) => {
                            setConfig((prev) => ({
                                ...prev,
                                context,
                                showModal: false
                            }));
                        },
                        [config.context]
                    )}
                />
            </Modal>

            <View style={styles.lineContainerContext}>
                <View style={styles.contextContainer}>
                    <Text style={styles.lineLabel}>Context</Text>
                    <FontAwesome
                        size={30}
                        name="edit"
                        color={textColor}
                        onPress={() =>
                            setConfig((prev) => ({ ...prev, showModal: true }))
                        }
                    />
                </View>
                <TextInput
                    editable={false}
                    multiline
                    style={styles.inputContext}
                    value={JSON.stringify(config.context, null, 4)}
                    placeholder={'{"isVip": true}'}
                />
            </View>
            <View>
                <Button
                    style={styles.startBtn}
                    title="Start"
                    onPress={onStartPress}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    lineContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 10
    },
    lineContainerContext: {
        height: 180,
        marginBottom: 10
    },
    containerResetButton: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contextContainer: {
        flexDirection: 'row'
    },
    lineInputText: {
        flex: 2
    },
    lineLabel: {
        flex: 1,
        ...globalStyles.label
    },
    picker: {
        backgroundColor: 'white'
    },
    inputContext: {
        flex: 2,
        minHeight: 150,
        maxHeight: 150,
        textAlignVertical: 'top',
        padding: 10,
        ...globalStyles.textInput
    },
    startBtn: {
        width: '100%',
        marginTop: 20
    }
});
