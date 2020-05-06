import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const FlagshipLoading = () => {
    return (
        <View style={styles.container}>
            <Text>Flagship SDK loading...</Text>
        </View>
    );
};

export default FlagshipLoading;
