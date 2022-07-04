import React from 'react';
import { StyleSheet } from 'react-native';
import GlobalStyles from '../constants/GlobalStyles';
import { LineContainerInputTextReadyOnlyProps } from '../types';
import { View, Text, TextInput } from './Themed';

function LineContainerInputReadyOnlyText(
    props: LineContainerInputTextReadyOnlyProps
) {
    return (
        <View style={styles.lineContainer}>
            <Text style={styles.lineLabel}>{props.label}</Text>
            <TextInput
                multiline
                editable={false}
                selectTextOnFocus={false}
                style={[
                    { minHeight: props.height },
                    styles.lineInputText,
                    GlobalStyles.textInput
                ]}
                value={props.value}
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
        ...GlobalStyles.label
    }
});

export default React.memo(LineContainerInputReadyOnlyText);
