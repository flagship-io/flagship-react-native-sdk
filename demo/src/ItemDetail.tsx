import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type ItemDetailProps = {
  title: string;
  subtitle: string;
  refNumber: string;
};

export function ItemDetail({title, subtitle, refNumber}: ItemDetailProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.refNumber}>{refNumber}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
  },
  refNumber: {
    fontSize: 14,
    color: '#929295',
  },
});
