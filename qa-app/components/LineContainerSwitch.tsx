import React from "react";
import { StyleSheet } from "react-native";
import GlobalStyles from "../constants/GlobalStyles";
import { LineContainerInputSwitchProps } from "../types";
import { Switch, View, Text } from "./Themed";



    function LineContainerSwitch(props: LineContainerInputSwitchProps) {
        return (
            <View style={styles.lineContainer}>
                <Text style={[styles.lineLabel, GlobalStyles.label]}>
                    {props.label}
                </Text>
                <Switch
                    style={[styles.lineInputText, GlobalStyles.textInput]}
                    value={props.value}
                    onValueChange={props.onValueChange}
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
        },
    
    });
    
    export default React.memo(LineContainerSwitch)