import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

type DiscountedPriceProps = {
  price: string;
  discountPrice: string;
};

export function DiscountedPrice({price, discountPrice}: DiscountedPriceProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.discountPrice}>{discountPrice}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  price: {
    fontSize: 24,
    fontWeight: '500',
    textDecorationLine: 'line-through',
    color: '#333',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountPrice: {
    fontSize: 24,
    fontWeight: '500',
    color: 'red',
    marginLeft: 10,
  },
});
