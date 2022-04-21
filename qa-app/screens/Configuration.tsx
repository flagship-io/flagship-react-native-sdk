import { useCallback, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View, Button, TextInput } from '../components/Themed';
import globalStyles from '../constants/GlobalStyles';
import { DecisionMode, FlagshipStatus, useFlagship } from '@flagship.io/react-native-sdk';
import { Picker } from '@react-native-picker/picker';
import { appContext } from '../context/AppContext';
import { Config } from '../types';
import LineContainerInputText from '../components/LineContainerInputText';
import LineContainerSwitch from '../components/LineContainerSwitch';

export default function ConfigurationScreen() {
    const [config, setConfig] = useState<Config>({
        context:"{}",
        timeout:2,
        hasConsented: true
    });

    const { state, setState } = useContext(appContext)

    const fs = useFlagship()

    useEffect(()=>{
        setConfig(prev=>({...prev, context: JSON.stringify(fs.context, null, 4)}))
    }, [JSON.stringify(fs.context)])

    useEffect(()=>{
        let context = "{}"
        try {
            context = JSON.stringify(state.visitorData.context||{},null, 4)
        } catch (error) {
            
        }
        
        setConfig({
            envId: state.envId,
            apiKey: state.apiKey,
            decisionMode: state.decisionMode,
            timeout: state.timeout,
            visitorId: state.visitorData.id,
            isAuthenticated: state.visitorData.isAuthenticated,
            hasConsented: state.visitorData.hasConsented,
            context
        })
    }, [JSON.stringify(state)])

    const onResetPress = () => {
        setConfig({
            context:"{}",
            timeout:2,
            hasConsented: true,
            decisionMode: DecisionMode.DECISION_API
        })
    };

    const onStartPress = () =>{
        if (!setState) {
            return;
        }
        let context = {}
        try {
            context = JSON.parse(config.context||"{}")
        } catch (error) {
            
        }
        
        setState(prev=>({
            ...prev,
            apiKey: config.apiKey || "",
            envId: config.envId || "",
            decisionMode: config.decisionMode,
            timeout: config.timeout,
            visitorData:{
                ...prev.visitorData,
                id: config.visitorId,
                context: context,
                isAuthenticated: config.isAuthenticated,
                hasConsented: config.hasConsented
            }
        }))
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.containerResetButton}>
                <Text>SDK Status:  {FlagshipStatus[state.status]}</Text>
                <Button title="Reset" onPress={onResetPress}/>
            </View>

            <LineContainerInputText
                label={"Env ID"}
                value= {config.envId}
                onChangeText = {useCallback((text) => {
                    setConfig((prev) => ({ ...prev, envId: text }));
                }, [config.envId])}
                placeHolder = {'Put the env ID'}
            />

            <LineContainerInputText
                label={"Api key"}
                value = {config.apiKey}
                onChangeText= {useCallback((text) => {
                    setConfig((prev) => ({  ...prev, apiKey: text }));
                },[config.apiKey])}
                placeHolder= {'Put the api key'}
            />
            

            <View style={styles.lineContainer}>
                <Text style={styles.lineLabel}>
                    Decision Mode
                </Text>
                <Picker
                    style={[styles.lineInputText, styles.picker]}
                    selectedValue={config.decisionMode}
                    onValueChange={(itemValue) =>
                        setConfig((prev) => ({
                            ...prev,
                            decisionMode: itemValue,
                            
                        }))
                    }
                >
                    <Picker.Item label="API" value={DecisionMode.DECISION_API} />
                    <Picker.Item label="BUCKETING" value={DecisionMode.BUCKETING} />
                </Picker>
            </View>

            <LineContainerInputText
                label={"Timeout (sec)"}
                value= {`${config.timeout}`}
                onChangeText= {useCallback((text) => {
                    setConfig((prev) => ({ ...prev, timeout: Number(text) }));
                },[config.timeout])}
                placeHolder={'Put the time'}
            />

            <LineContainerInputText
                label ={"Visitor id"}
                value= {config.visitorId}
                onChangeText ={ useCallback((text) => {
                    setConfig((prev) => ({  ...prev, visitorId: text }));
                }, [config.visitorId])}
                placeHolder= {'Put the visitor ID'}
            />

            <LineContainerSwitch
                label={"Authenticated"}
                value={config.isAuthenticated}
                onValueChange= {useCallback((isAuthenticated) => {
                    setConfig((prev) => ({  ...prev, isAuthenticated }));
                }, [config.isAuthenticated])}
            /> 

            <LineContainerSwitch
                label = {"Consent"}
                value = {config.hasConsented}
                onValueChange= {useCallback((hasConsented) => {
                    setConfig((prev) => ({  ...prev, hasConsented }));
                }, [config.hasConsented])}
            />

            <View style={styles.lineContainerContext}>
                <Text style={styles.lineLabel}>
                    Context
                </Text>
                <TextInput
                    multiline
                    style={styles.inputContext}
                    value={config.context}
                    placeholder={'{"isVip": true}'}
                    onChangeText={useCallback((context) => {
                        setConfig((prev) => ({  ...prev, context }));
                    }, [config.context])}
                />
            </View>
            <View>
                <Button style={styles.startBtn} title="Start" onPress={onStartPress} />
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
    containerResetButton:{
        marginBottom:10,
        flexDirection:'row',
        justifyContent:"space-between"
    },
    lineInputText: {
        flex: 2
    },
    lineLabel: {
        flex: 1,
        ...globalStyles.label
    },
    picker: {
        backgroundColor: 'white',
    },
    inputContext:{
        flex: 2,
        minHeight: 150,
        maxHeight:150,
        textAlignVertical: 'top',
        padding:10,
        ...globalStyles.textInput
    },
    startBtn:{
        width:"100%",
        marginTop:20
    }
});
