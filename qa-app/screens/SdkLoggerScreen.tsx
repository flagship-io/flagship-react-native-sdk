import React, { useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {Text, Button, View} from '../components/Themed'
import Colors from '../constants/Colors';
import { appContext } from '../context/AppContext';

function SdkLoggerScreen(){
    const appState = useContext(appContext)
    const onPressClear = ()=>{
        if (appState.setState) {
            appState.setState(prev =>({...prev, logs:""}))
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerResetButton}>
                <Button style={styles.clearBtn} title="Clear" onPress={onPressClear}/>
            </View>
        <ScrollView  style={styles.scrollView} >
            <Text>{appState.state.logs || "Empty"}</Text>
        </ScrollView>
        </View>
   )
}

export default SdkLoggerScreen;

const styles = StyleSheet.create({ 
    container:{
        padding:20,
        flex:1
    },
    containerResetButton:{
        marginBottom:20,
    },
    clearBtn:{width:70, height:40},
    scrollView:{
        padding:5,
        borderColor: Colors.dark.tint,
        borderWidth: 1
    }
});