import { EventCategory, HitType, IEvent } from '@flagship.io/react-native-sdk';
import { Picker } from '@react-native-picker/picker';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import GlobalStyles from '../../constants/GlobalStyles';
import LineContainerInputText from '../LineContainerInputText';
import { View, Text } from '../Themed';
import Common from './Common';

function EventView() {
    const [event, setEvent] = useState<IEvent>({
        type: HitType.EVENT,
        category: EventCategory.ACTION_TRACKING
    } as any);

    const labelStyle = useMemo(
        () => [styles.lineLabel, GlobalStyles.label],
        []
    );
    return (
        <>
            <View style={styles.lineContainer}>
                <Text style={labelStyle}>Category *</Text>
                <Picker
                    style={[styles.lineInputText, styles.picker]}
                    selectedValue={event.category}
                    onValueChange={(itemValue) =>
                        setEvent((prev) => ({ ...prev, category: itemValue }))
                    }
                >
                    <Picker.Item
                        label={EventCategory.ACTION_TRACKING}
                        value={EventCategory.ACTION_TRACKING}
                    />
                    <Picker.Item
                        label={EventCategory.USER_ENGAGEMENT}
                        value={EventCategory.USER_ENGAGEMENT}
                    />
                </Picker>
            </View>
            <LineContainerInputText
                label={'action *'}
                value={event.action}
                onChangeText={useCallback(
                    (text) => {
                        setEvent((prev) => ({
                            ...prev,
                            action: text
                        }));
                    },
                    [event.action]
                )}
                placeHolder={'action'}
            />
            <LineContainerInputText
                label={'label'}
                value={event.label}
                onChangeText={useCallback(
                    (text) => {
                        setEvent((prev) => ({
                            ...prev,
                            label: text
                        }));
                    },
                    [event.label]
                )}
                placeHolder={'label'}
            />
            <LineContainerInputText
                label={'value'}
                value={event.value?.toString()}
                onChangeText={useCallback(
                    (text) => {
                        setEvent((prev) => ({
                            ...prev,
                            value: Number(text) || undefined
                        }));
                    },
                    [event.value]
                )}
                placeHolder={'value'}
            />
            <Common hit={event} />
        </>
    );
}

export default EventView;

const styles = StyleSheet.create({
    lineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    lineContainerContext: {
        height: 180,
        marginBottom: 10
    },
    containerResetButton: {
        marginBottom: 10,
        alignItems: 'flex-end'
    },
    lineInputText: {
        flex: 2
    },
    lineLabel: {
        flex: 1
    },
    picker: {
        backgroundColor: 'white'
    },
    inputContext: {
        minHeight: 150,
        maxHeight: 150,
        textAlignVertical: 'top',
        padding: 10
    }
});
