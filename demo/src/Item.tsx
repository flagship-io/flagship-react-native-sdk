//start demo
//path: demo/src/Item.tsx
import React from 'react';
import {View, StyleSheet, Alert, Text} from 'react-native';
import {itemData} from './itemData';
import {
  EventCategory,
  HitType,
  useFlagship,
  useFsFlag,
} from '@flagship.io/react-native-sdk';
import {ItemImage} from './ItemImage';
import {ItemDetail} from './ItemDetail';
import {DiscountedPrice} from './DiscountedPrice';
import {ItemPrice} from './ItemPrice';
import {AddCartButton} from './AddCartButton';

export const Item = () => {
  const {title, subtitle, refNumber, price, imageUrl, imageAlt, discountPrice} =
    itemData;

  const fs = useFlagship();

  /*Step 2: Get the values of the flags for the visitor*/
  const enableDiscountFlag = useFsFlag('fs_enable_discount').getValue(false);
  // eslint-disable-next-line prettier/prettier
  const addToCartBtnColorFlag = useFsFlag('fs_add_to_cart_btn_color').getValue('#556cd6');

  const handleAddToCart = () => {
    // Step 3: Send a hit to track an action
    fs.sendHits({
      type: HitType.EVENT,
      category: EventCategory.ACTION_TRACKING,
      action: 'add-to-cart-clicked',
    });

    Alert.alert('Item added to cart');
  };

  return (
    <View style={styles.container}>
      <ItemDetail title={title} subtitle={subtitle} refNumber={refNumber} />
      <ItemImage imageUrl={imageUrl} imageAlt={imageAlt} />
      <View style={styles.itemContainer}>
        <Text>Price:</Text>
        {enableDiscountFlag ? (
          <DiscountedPrice price={price} discountPrice={discountPrice} />
        ) : (
          <ItemPrice price={price} />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <AddCartButton
          backgroundColor={addToCartBtnColorFlag}
          onPress={handleAddToCart}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f7',
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    justifyContent: 'center',
  },
});
//end demo
