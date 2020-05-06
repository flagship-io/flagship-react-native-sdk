import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { useFsModifications } from '@flagship.io/react-native-sdk';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 100
    },
    checkBoxContainer: {
        marginTop: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
        // justifyContent: 'center'
    },
    text: {
        fontSize: 20
    }
});

const Container = ({ state, onStateChange }) => {
    const fsModifications = useFsModifications([
        {
            flexDirection: 'start',
            key: 'discount',
            defaultValue: '0%',
            activate: false
        }
    ]);

    return (
        <View style={styles.container}>
            <Text style={{ ...styles.text, fontSize: 18 }}>
                Edit the visitor context and see the discount rate updating
                automatically:
            </Text>
            <View style={styles.checkBoxContainer}>
                <Text style={{ ...styles.text, marginRight: 24 }}>isAuth:</Text>
                <View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#767577' }}
                        thumbColor={state.isAuth ? '#8DFF33' : '#FF3C33'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(bool) =>
                            onStateChange({ ...state, isAuth: bool })
                        }
                        value={state.isAuth}
                    />
                </View>
            </View>
            <View style={styles.checkBoxContainer}>
                <Text style={{ ...styles.text, marginRight: 24 }}>isVip:</Text>
                <View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#767577' }}
                        thumbColor={state.isVip ? '#8DFF33' : '#FF3C33'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(bool) =>
                            onStateChange({ ...state, isVip: bool })
                        }
                        value={state.isVip}
                    />
                </View>
            </View>

            <Text style={{ ...styles.text, fontSize: 18, marginTop: 24 }}>
                You're actual discount rate is now
            </Text>
            <Text style={{ ...styles.text, fontSize: 36, marginTop: 12 }}>
                {fsModifications.discount}
            </Text>
            <Text style={{ ...styles.text, fontSize: 18, marginTop: 12 }}>
                on our platform !
            </Text>
        </View>
    );
};

export default Container;
