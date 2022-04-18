import { useCallback, useContext, useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Text, View, TextInput, Button } from '../components/Themed';
import {
    LineContainerInputTextProps,
    LineContainerInputTextReadyOnlyProps
} from '../types';
import globalStyles from '../constants/GlobalStyles';
import { appContext } from '../context/AppContext';
import { useFlagship } from '@flagship.io/react-native-sdk';

export default function TabTwoScreen() {
    const [visitorId, setVisitorId] = useState('');
    const fs = useFlagship();
    const [_, setToggleAuthenticate] = useState(false)
    const [isFetching, setIsFetching] = useState(false)

    const lineTextInputStyle = useMemo(
        () => [styles.lineInputText, globalStyles.textInput],
        []
    );
    const labelStyle = useMemo(
        () => [styles.lineLabel, globalStyles.label],
        []
    );

    const unauthenticate = ()=>{
        fs.unauthenticate()
        setToggleAuthenticate(prev=> !prev)
    }

    const authenticate = ()=>{
        fs.authenticate(visitorId)
        setVisitorId("")
        setToggleAuthenticate(prev=> !prev)
    }

    const fetchFlags = ()=>{
        setIsFetching(true)
        fs.fetchFlags().finally(()=>{
            setIsFetching(false)
        })
    }
 
    function lineContainerInputReadyOnlyText(
        props: LineContainerInputTextReadyOnlyProps
    ) {
        return (
            <View style={styles.lineContainer}>
                <Text style={labelStyle}>{props.label}</Text>
                <TextInput
                    editable={false}
                    selectTextOnFocus={false}
                    style={lineTextInputStyle}
                    value={props.value}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.container1} >
                {lineContainerInputReadyOnlyText({
                    label: 'Visitor id',
                    value: fs.visitorId
                })}

                {lineContainerInputReadyOnlyText({
                    label: 'Anonymous id',
                    value: fs.anonymousId
                })}
            </View>
            <View style={styles.container2}>
                <View style={styles.inputContainer}>
                    <Text style={labelStyle}>Authenticate visitor id</Text>
                    <TextInput
                        style={lineTextInputStyle}
                        value={visitorId}
                        onChangeText={useCallback(
                            (text) => {
                                setVisitorId(text);
                            },
                            [visitorId]
                        )}
                    />
                </View>
                <Button style={styles.btn} title="Authenticate" onPress={authenticate} />
                <Button style={styles.btn} title="Unauthenticate" onPress={unauthenticate} />
                <Button style={styles.btn} isLoading={isFetching} title="Fetch flags" onPress={fetchFlags} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      padding: 20,
    },
    container1:{
        flex:1
    },
    container2:{
      flex:1,
    },
    inputContainer:{
        marginBottom: 30,
        height:80
    },
    lineInputText: {
        flex: 2
    },
    lineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'flex-start',
        marginBottom: 10,
    },
    lineLabel: {
        flex: 1
    },
    btn:{
        marginBottom: 10,
    }
});
