import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native';
import { LineContainerInputTextProps } from "../types";
import { View, Text, TextInput } from "./Themed";
import globalStyles from '../constants/GlobalStyles';


function LineContainerInputText({value, onChangeText, placeHolder, label}: LineContainerInputTextProps) {          
    return (
        <View style={styles.lineContainer}>
            <Text style={[styles.lineLabel, globalStyles.label]}>
                {label}
            </Text>
            <TextInput
                style={[styles.lineInputText, globalStyles.textInput]}
                value={value}
                placeholder={placeHolder}
                onChangeText={onChangeText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    lineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    lineInputText: {
        flex: 2
    },
    lineLabel: {
        flex: 1,
    },

});


export default  React.memo(LineContainerInputText)