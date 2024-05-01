import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

type ItemImageProps = {
  imageUrl: string;
  imageAlt: string;
};

export const ItemImage = ({imageUrl, imageAlt}: ItemImageProps) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: imageUrl}}
        accessibilityLabel={imageAlt}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: '80%',
    height: 200,
    resizeMode: 'contain',
  },
});
