import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, TextInput, Button } from '../components/Themed';
import globalStyles from '../constants/GlobalStyles';
import { useFlagship } from '@flagship.io/react-native-sdk';
import LineContainerInputReadyOnlyText from '../components/LineContainerInputReadyOnlyText';

export default function UserScreen() {
    const [visitorId, setVisitorId] = useState('');
    const fs = useFlagship();
    const [_, setToggleAuthenticate] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const unauthenticate = useCallback(() => {
        fs.unauthenticate();
        setToggleAuthenticate((prev) => !prev);
    }, []);

    const authenticate = useCallback(() => {
        fs.authenticate(visitorId);
        setVisitorId('');
        setToggleAuthenticate((prev) => !prev);
    }, [visitorId]);

    const fetchFlags = useCallback(() => {
        setIsFetching(true);
        fs.fetchFlags().finally(() => {
            setIsFetching(false);
        });
    }, [fs.status]);

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <LineContainerInputReadyOnlyText
                    label={'Visitor id'}
                    value={fs.visitorId}
                />
                <LineContainerInputReadyOnlyText
                    label={'Anonymous id'}
                    value={fs.anonymousId || undefined}
                />
            </View>
            <View style={styles.container2}>
                <View style={styles.inputContainer}>
                    <Text style={styles.lineLabel}>
                        Authenticate visitor id
                    </Text>
                    <TextInput
                        style={styles.lineInputText}
                        value={visitorId}
                        onChangeText={useCallback(
                            (text) => {
                                setVisitorId(text);
                            },
                            [visitorId]
                        )}
                    />
                </View>
                <Button
                    style={styles.btn}
                    title="Authenticate"
                    onPress={authenticate}
                />
                <Button
                    style={styles.btn}
                    title="Unauthenticate"
                    onPress={unauthenticate}
                />
                <Button
                    style={styles.btn}
                    isLoading={isFetching}
                    title="Fetch flags"
                    onPress={fetchFlags}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    container1: {
        flex: 1
    },
    container2: {
        flex: 1
    },
    inputContainer: {
        marginBottom: 30,
        height: 80
    },
    lineInputText: {
        flex: 2,
        ...globalStyles.textInput
    },
    lineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10
    },
    lineLabel: {
        flex: 1,
        ...globalStyles.label
    },
    btn: {
        marginBottom: 10,
        width: '100%'
    }
});
