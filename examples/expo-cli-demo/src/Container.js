import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Switch,
    Image,
    SafeAreaView
} from 'react-native';
import { useFsModifications } from '@flagship.io/react-native-sdk';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 64
    },
    checkBoxContainer: {
        marginTop: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
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

    const getGif = (discountPercentageStr) => {
        const discountPercentage = parseInt(discountPercentageStr);
        if (discountPercentage >= 30) {
            return 'https://media.tenor.com/images/72eab4275da7cd5dc5e70ff2815fdcf8/tenor.gif';
        } else if (discountPercentage >= 20) {
            return 'https://media.tenor.com/images/daee02d77a3fe784ddb07a7e9b112b0d/tenor.gif';
        } else if (discountPercentage >= 10) {
            return 'https://media.tenor.com/images/79e5ef1cd6ec5ccc89763797ac4cf312/tenor.gif';
        } else {
            return 'https://media.tenor.com/images/724cffdf089cb7522f298c131f39b89d/tenor.gif';
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text
                style={{
                    fontSize: 16,
                    color: 'gray',
                    marginRight: 8,
                    marginLeft: 8
                }}
            >
                Edit the visitor context. It will set a discount rate based on a
                flagship campaign specification.
            </Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
                Visitor context:
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
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
                Result:
            </Text>
            <View style={{ ...styles.container, marginTop: 8 }}>
                <View style={{ paddingTop: 24 }}>
                    <Image
                        style={{
                            width: 200,
                            height: 200,
                            resizeMode: 'stretch'
                        }}
                        source={{
                            uri: getGif(fsModifications.discount)
                        }}
                    />
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
        </SafeAreaView>
    );
};

export default Container;
