import { HitType } from '@flagship.io/react-native-sdk';
import { Picker } from '@react-native-picker/picker';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import EventView from '../components/hits/EventView';
import ItemView from '../components/hits/ItemVIew';
import PageView from '../components/hits/PageView';
import TransactionView from '../components/hits/TransactionView';
import { View, Text } from '../components/Themed';
import GlobalStyles from '../constants/GlobalStyles';

const hitTypes: HitType[] = [
    HitType.PAGE,
    HitType.SCREEN,
    HitType.EVENT,
    HitType.TRANSACTION,
    HitType.ITEM
];

function HitsScreen() {
    const [type, setType] = useState<HitType>(HitType.PAGE_VIEW);
    const labelStyle = useMemo(
        () => [styles.lineLabel, GlobalStyles.label],
        []
    );
    return (
        <ScrollView style={styles.container}>
            <View style={styles.lineContainer}>
                <Text style={labelStyle}>Type</Text>
                <Picker
                    style={[styles.lineInputText, styles.picker]}
                    selectedValue={type}
                    onValueChange={(itemValue) => setType(itemValue)}
                >
                    {hitTypes.map((item, index) => (
                        <Picker.Item key={index} label={item} value={item} />
                    ))}
                </Picker>
            </View>
            {type === HitType.PAGE_VIEW && (
                <PageView type={HitType.PAGE_VIEW} />
            )}
            {type === HitType.SCREEN_VIEW && (
                <PageView type={HitType.SCREEN_VIEW} />
            )}

            {type === HitType.EVENT && <EventView />}
            {type === HitType.TRANSACTION && <TransactionView />}
            {type === HitType.ITEM && <ItemView />}
        </ScrollView>
    );
}

export default HitsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
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
