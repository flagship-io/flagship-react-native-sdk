import React from 'react';
import { StyleSheet } from 'react-native';
import { LineContainerInputTextProps } from '../types';
import { View, Text, TextInput } from './Themed';
import globalStyles from '../constants/GlobalStyles';

function LineContainerInputText({
    value,
    onChangeText,
    placeHolder,
    label
}: LineContainerInputTextProps) {
    return (
        <View style={styles.lineContainer}>
            <Text style={styles.lineLabel}>{label}</Text>
            <TextInput
                style={styles.lineInputText}
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
        flex: 2,
        ...globalStyles.textInput
    },
    lineLabel: {
        flex: 1,
        ...globalStyles.label
    }
});

export default React.memo(LineContainerInputText);
