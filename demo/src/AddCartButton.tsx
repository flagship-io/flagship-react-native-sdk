import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

type AddCartButtonProps = {
  backgroundColor: string;
  onPress: () => void;
};

export function AddCartButton({backgroundColor, onPress}: AddCartButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor}]}
      onPress={onPress}>
      <Text style={styles.text}>Add to cart</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
