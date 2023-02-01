import React from 'react';
import { StyleSheet } from 'react-native';
import GlobalStyles from '../constants/GlobalStyles';
import { LineContainerInputSwitchProps } from '../types';
import { Switch, View, Text } from './Themed';

function LineContainerSwitch(props: LineContainerInputSwitchProps) {
    return (
        <View style={styles.lineContainer}>
            <Text style={styles.lineLabel}>{props.label}</Text>
            <Switch
                style={styles.lineInputText}
                value={props.value}
                onValueChange={props.onValueChange}
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
        ...GlobalStyles.textInput
    },
    lineLabel: {
        flex: 1,
        ...GlobalStyles.label
    }
});

export default React.memo(LineContainerSwitch);
