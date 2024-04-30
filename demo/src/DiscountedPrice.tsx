import React from 'react';
import {Text, StyleSheet} from 'react-native';

type DiscountedPriceProps = {
  price: string;
  discountPrice: string;
};

export function DiscountedPrice({price, discountPrice}: DiscountedPriceProps) {
  return (
    <>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.discountPrice}>{discountPrice}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  price: {
    fontSize: 24,
    fontWeight: '500',
    textDecorationLine: 'line-through',
  },
  discountPrice: {
    fontSize: 24,
    fontWeight: '500',
    color: 'red',
    marginLeft: 10,
  },
});
