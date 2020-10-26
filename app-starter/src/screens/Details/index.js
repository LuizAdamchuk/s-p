import React, { useState, useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';

import { api } from '../../services/api';
import { BASE_URL } from '../../constants/Keys';
import { styles } from './style';
import { Header } from '../../components/Header';

export const Details = () => {
  const [articlesData, setArticlesData] = useState([]);
  const [imageData, setImageData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      api.get('/articles').then(res => {
        setArticlesData(res.data);
      });
    }, []),
  );
  useFocusEffect(
    useCallback(() => {
      api.get('/upload/files').then(res => {
        setImageData(res.data);
      });
    }, []),
  );
  console.log(articlesData);
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Header />
      <View style={styles.content}>
        <ScrollView>
          <View style={styles.content}>
            {articlesData.map((i, k) => (
              <View key={k}>
                <Text style={{ fontWeight: 'bold' }}>{i.title}</Text>
                <Text>{i.message}</Text>

                <Image
                  source={{
                    uri: `${i.cover.formats.small.url}`,
                  }}
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: 48,
                    alignSelf: 'center',
                    marginVertical: 8,
                  }}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
