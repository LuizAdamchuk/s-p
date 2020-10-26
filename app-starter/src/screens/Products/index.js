import React, { useState, useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import { styles } from './style';
import { api } from '../../services/api';
import Colors from '../../constants/Colors';

export const Products = () => {
  const [productData, setProductData] = useState([]);
  const [total, setTotal] = useState([]);

  useFocusEffect(
    useCallback(() => {
      api.get('/products').then(res => {
        setProductData(res.data);
      });
    }, []),
  );
  useFocusEffect(
    useCallback(() => {
      api.get('/products/sumall').then(res => {
        setTotal(res.data[0].sum);
      });
    }, []),
  );
  if (!productData && !total) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>Products</Text>
      <Text>total{total}</Text>

      {productData && (
        <>
          {productData.map((i, k) => (
            <View key={i.id}>
              <Text>{i.name}</Text>
              {i.stock_events.map((i, k) => (
                <Text
                  key={k}
                  style={{ color: i.type === 'add' ? 'blue' : 'red' }}
                >
                  {i.type === 'add' ? `+${i.quantity}` : `-${i.quantity}`}
                </Text>
              ))}
            </View>
          ))}
        </>
      )}
    </View>
  );
};
