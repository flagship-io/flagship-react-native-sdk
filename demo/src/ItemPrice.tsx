import React from 'react';
import {StyleSheet, Text} from 'react-native';

type ItemPriceProps = {
  price: string;
};

export function ItemPrice({price}: ItemPriceProps) {
  return <Text style={styles.price}>{price}</Text>;
}

const styles = StyleSheet.create({
  price: {
    fontSize: 24,
    fontWeight: '500',
  },
});
