import { useCallback, useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View, Button, TextInput, Switch } from '../components/Themed';
import globalStyles from '../constants/GlobalStyles';
import { DecisionMode } from '@flagship.io/react-native-sdk';
import { Picker } from '@react-native-picker/picker';
import { placeholder } from '@babel/types';

export type Config = {
    envId?: string;
    apiKey?: string;
    decisionMode?: string;
    timeout?: number
    visitorId?: string
    isAuthenticated?:boolean
    hasConsented?: boolean
    context?: string
};

interface LineContainerInputTextProps {
    label?: string
    value?: string;
    placeHolder?: string;
    onChangeText: (text: string) => void;
}

interface LineContainerInputSwitchProps {
    label?: string
    value?: boolean;
    onValueChange: (value: boolean) => void;
}

export default function ConfigurationScreen() {
    const [config, setConfig] = useState<Config>({
        timeout:2,
        hasConsented: true
    });

    const onResetPress = () => {
        //
    };

    
    const lineTextInputStyle = useMemo(()=>[styles.lineInputText, globalStyles.textInput],[])
    const labelStyle = useMemo(()=>[styles.lineLabel, globalStyles.label], [])
    const lineTextInputContextStyle = useMemo(()=>[styles.lineInputText, globalStyles.textInput, styles.inputContext],[])

    function lineContainerInputText(props: LineContainerInputTextProps) {        
        return (
            <View style={styles.lineContainer}>
                <Text style={labelStyle}>
                    {props.label}
                </Text>
                <TextInput
                    style={lineTextInputStyle}
                    value={props.value}
                    placeholder={props.placeHolder}
                    onChangeText={props.onChangeText}
                />
            </View>
        );
    }

    function lineContainerSwitch(props: LineContainerInputSwitchProps) {
        return (
            <View style={styles.lineContainer}>
                <Text style={labelStyle}>
                    {props.label}
                </Text>
                <Switch
                    style={lineTextInputStyle}
                    value={props.value}
                    onValueChange={props.onValueChange}
                />
            </View>
        );
    }


    return (
        <ScrollView style={styles.container}>
            <View>
                <Button title="Reset" onPress={onResetPress} />
            </View>

            {lineContainerInputText({
                label:"Env ID",
                value: config.envId,
                onChangeText: useCallback((text) => {
                    setConfig((prev) => ({ ...prev, envId: text }));
                }, [config.envId]),
                placeHolder: 'Put the env ID'
            })}

            {lineContainerInputText({
                label: "Api key",
                value: config.apiKey,
                onChangeText: useCallback((text) => {
                    setConfig((prev) => ({  ...prev, apiKey: text }));
                },[config.apiKey]),
                placeHolder: 'Put the api key'
            })}
            

            <View style={styles.lineContainer}>
                <Text style={labelStyle}>
                    Decision Mode
                </Text>
                <Picker
                    style={[styles.lineInputText, styles.picker]}
                    selectedValue={config.decisionMode}
                    onValueChange={(itemValue) =>
                        setConfig((prev) => ({
                            decisionMode: itemValue,
                            ...prev
                        }))
                    }
                >
                    <Picker.Item label="API" value="API" />
                    <Picker.Item label="BUCKETING" value="BUCKETING" />
                </Picker>
            </View>

            {lineContainerInputText({
                label:"Timeout (sec)",
                value: `${config.timeout}`,
                onChangeText: useCallback((text) => {
                    setConfig((prev) => ({ ...prev, timeout: Number(text) }));
                },[config.timeout]),
                placeHolder: 'Put the time'
            })}

            {lineContainerInputText({
                label:"Visitor id",
                value: config.visitorId,
                onChangeText: useCallback((text) => {
                    setConfig((prev) => ({  ...prev, visitorId: text }));
                }, [config.visitorId]),
                placeHolder: 'Put the visitor ID'
            })} 

            {lineContainerSwitch({
                label:"Authenticated",
                value: config.isAuthenticated,
                onValueChange: useCallback((isAuthenticated) => {
                    setConfig((prev) => ({  ...prev, isAuthenticated }));
                }, [config.isAuthenticated])
            })} 

            {lineContainerSwitch({
                label:"Consent",
                value: config.hasConsented,
                onValueChange: useCallback((hasConsented) => {
                    setConfig((prev) => ({  ...prev, hasConsented }));
                }, [config.hasConsented])
            })}

            <View style={styles.lineContainerContext}>
                <Text style={labelStyle}>
                    Context
                </Text>
                <TextInput
                    multiline
                    style={lineTextInputContextStyle}
                    value={config.context}
                    placeholder={'{"isVip": true}'}
                    onChangeText={useCallback((context) => {
                        setConfig((prev) => ({  ...prev, context }));
                    }, [config.context])}
                />
            </View>
            <View>
                <Button title="Start" onPress={onResetPress} />
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
        height:180,
        marginBottom: 10
    },
    lineInputText: {
        flex: 2
    },
    lineLabel: {
        flex: 1
    },
    picker: {
        backgroundColor: 'white',
    },
    inputContext:{
        minHeight: 150,
        maxHeight:150
    },
    resetButton:{
        width:"30%"
    }
});
