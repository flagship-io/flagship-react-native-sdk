import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFsModifications } from '@flagship.io/react-native-sdk';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const Container = () => {
    const fsModifications = useFsModifications([
        {
            key: 'discount',
            defaultValue: '0%',
            activate: false
        }
    ]);
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>{JSON.stringify(fsModifications)}</Text>
        </View>
    );
};

export default Container;
