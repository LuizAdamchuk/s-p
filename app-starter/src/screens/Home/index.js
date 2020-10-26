import React, { useEffect } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import { styles } from './style';
import { Button } from '../../components/Button';

export const Home = () => {
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Desculpe, precisamos de acesso a sua galeria!');
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text> Home</Text>
      <Button
        variant="primary"
        label="Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        variant="primary"
        label="Products"
        onPress={() => navigation.navigate('Products')}
      />
    </View>
  );
};
