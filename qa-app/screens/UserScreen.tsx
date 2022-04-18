import { useCallback, useContext, useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Text, View, TextInput } from '../components/Themed';
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

    const lineTextInputStyle = useMemo(
        () => [styles.lineInputText, globalStyles.textInput],
        []
    );
    const labelStyle = useMemo(
        () => [styles.lineLabel, globalStyles.label],
        []
    );
 
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
        <ScrollView style={styles.container}>
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
                <View>
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
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      padding: 20,
    },
    container1:{
      backgroundColor:'red'
    },
    container2:{
      marginTop: 100,
      backgroundColor:"gray"
    },
    lineInputText: {
        flex: 2
    },
    lineContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 10
    },
    lineLabel: {
        flex: 1
    }
});
