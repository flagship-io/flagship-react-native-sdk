import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

interface VipSwitchProps {
  isVip: boolean;
  setIsVip: (value: boolean) => void;
}

export function VipSwitch({isVip, setIsVip}: VipSwitchProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Is vip client</Text>
      <Switch value={isVip} onValueChange={setIsVip} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16, // Adjust as needed
  },
  label: {
    fontSize: 16,
  },
});
