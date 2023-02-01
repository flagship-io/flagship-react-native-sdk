import { Picker } from '@react-native-picker/picker';
import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import LineContainerInputReadyOnlyText from '../components/LineContainerInputReadyOnlyText';
import LineContainerInputText from '../components/LineContainerInputText';
import { View, Text, Button } from '../components/Themed';
import GlobalStyles from '../constants/GlobalStyles';
import { IFlag, useFlagship } from '@flagship.io/react-native-sdk';
import LineContainerSwitch from '../components/LineContainerSwitch';
import Color from '../constants/Colors';

const FlagTypes = ['string', 'number', 'object', 'array', 'boolean'] as const;

type FlagParam = {
    userExposed: boolean;
    key: string;
    default: string;
    type: typeof FlagTypes[number];
};

export default function GetFlag() {
    const [flagParam, setFlagParam] = useState<FlagParam>({
        key: '',
        default: '',
        type: 'string',
        userExposed: true
    });
    const [flag, setFlag] = useState<IFlag<unknown>>();
    const [userExposedLoading, setUserExposedLoading] = useState(false);

    const fs = useFlagship();

    const getFlag = useCallback(() => {
        let defaultValue: unknown = flagParam.default;

        switch (flagParam.type) {
            case 'object':
            case 'boolean':
            case 'array':
                try {
                    defaultValue = JSON.parse(flagParam.default);
                } catch (error) {
                    console.log('error', error);
                    defaultValue = flagParam.default;
                }
                break;
            case 'number':
                defaultValue = Number(flagParam.default);
                if (typeof defaultValue !== 'number') {
                    console.log('');
                    defaultValue = flagParam.default;
                }
                break;
            default:
                break;
        }
        const currentFlag = fs.getFlag(flagParam.key, defaultValue);
        setFlag(currentFlag);
    }, [flagParam.key, flagParam.default, flagParam.type]);

    const userExposed = useCallback(() => {
        if (!flag || userExposedLoading) {
            return;
        }
        setUserExposedLoading(true);
        flag.userExposed().finally(() => {
            setUserExposedLoading(false);
        });
    }, [flag]);

    const flagValue = useMemo(() => {
        return JSON.stringify(flag?.getValue(flagParam.userExposed), null, 4);
    }, [flag, flagParam.userExposed]);

    const flagExists = useMemo(() => {
        return JSON.stringify(flag?.exists());
    }, [flag]);

    const flagMetadata = useMemo(() => {
        return JSON.stringify(flag?.metadata, null, 4);
    }, [flag]);

    return (
        <ScrollView style={styles.container}>
            <LineContainerInputText
                label={'Key'}
                value={flagParam.key}
                onChangeText={useCallback(
                    (text) => {
                        setFlagParam((prev) => ({ ...prev, key: text }));
                    },
                    [flagParam.key]
                )}
                placeHolder={'Flag key'}
            />
            <LineContainerInputText
                label={'Default value'}
                value={flagParam.default as string}
                onChangeText={useCallback(
                    (text) => {
                        setFlagParam((prev) => ({ ...prev, default: text }));
                    },
                    [flagParam.default]
                )}
                placeHolder={'Flag default value'}
            />

            <View style={styles.lineContainer}>
                <Text style={styles.lineLabel}>Type</Text>
                <Picker
                    style={[styles.lineInputText, styles.picker]}
                    selectedValue={flagParam.type}
                    onValueChange={(itemValue) =>
                        setFlagParam((prev) => ({ ...prev, type: itemValue }))
                    }
                >
                    {FlagTypes.map((item, index) => (
                        <Picker.Item key={index} label={item} value={item} />
                    ))}
                </Picker>
            </View>

            <LineContainerSwitch
                label="userExposed"
                value={flagParam.userExposed}
                onValueChange={useCallback(
                    (value) => {
                        setFlagParam((prev) => ({ ...prev, userExposed:value }));
                    },
                    [flagParam.userExposed]
                )}
            />

            <View style={styles.btnContainer}>
                <Button style={styles.btn} title="Get Flag" onPress={getFlag} />
                <Button
                    isLoading={userExposedLoading}
                    style={styles.btn}
                    title="User exposed"
                    onPress={userExposed}
                />
            </View>
            <View style={styles.flagContainer}>
                <LineContainerInputReadyOnlyText
                    height={150}
                    label="Flag Value"
                    value={flagValue}
                />
                <LineContainerInputReadyOnlyText
                    label="Flag exists"
                    value={flagExists}
                />
                <LineContainerInputReadyOnlyText
                    height={200}
                    label="Flag metadata"
                    value={flagMetadata}
                />
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
    flagContainer: {
        borderColor: Color.dark.tint2,
        borderWidth: 1,
        marginBottom: 30,
        padding: 10
    },
    lineLabel: {
        flex: 1,
        ...GlobalStyles.label
    },
    picker: {
        backgroundColor: 'white'
    },
    inputContext: {
        minHeight: 150,
        maxHeight: 150,
        textAlignVertical: 'top',
        padding: 10
    },
    btnContainer: {
        marginTop: 20,
        marginBottom: 20
    },
    btn: {
        marginTop: 10,
        marginBottom: 10,
        width: '100%'
    }
});
