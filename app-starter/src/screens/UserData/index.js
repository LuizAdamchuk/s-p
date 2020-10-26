import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Alert, View, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { useAuth } from '../../hooks/authContext';
import { styles } from './style';
import { api } from '../../services/api';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BorderlessButton,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

import { Button } from '../../components/Button';

export const UserData = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation();

  const [userData, setUserData] = useState([]);

  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [image, setImage] = useState(null);

  useFocusEffect(
    useCallback(() => {
      api.get('users/me').then(response => {
        setUserData(response.data);
        console.log(response.data);
      });
    }, []),
  );

  const handleSignOut = useCallback(() => {
    signOut();
  }, []);

  const handlePickImage = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    // HARDCODE - Relation with article database are made hardcoded
    if (!result.cancelled) {
      setImage(result.uri);
      const data = new FormData();
      data.append('files', {
        type: 'multipart/form-data',
        name: `${userData.username}-${Date.now()}.jpg`,
        uri: result.uri,
      });
      data.append('refId', 2);
      data.append('ref', 'article');
      data.append('field', 'cover');
      api.post('/upload', data);
    }
  }, [image]);

  const handleUpdateUser = useCallback(() => {
    const parsedData = {
      username: nameInput.length !== 0 ? nameInput : userData.username,
      email: emailInput.length !== 0 ? emailInput : userData.email,
    };
    console.log(`/users/${userData.id}`, { body: parsedData });
    api
      .put(`/users/${userData.id}`, parsedData)
      .then(() => {
        setNameInput('');
        setEmailInput('');
        Alert.alert('Tudo certo', 'Perfil atualizado');
        return navigation.navigate('Home');
      })
      .catch(() => {
        return Alert.alert('Atenção', 'Não foi possível atualizar perfil');
      });
  }, [nameInput, emailInput]);
  return (
    <ScrollView>
      <View style={styles.container}>
        <SafeAreaView />

        <View style={styles.content}>
          {image ? (
            <BorderlessButton onPress={handlePickImage}>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: 48,
                    alignSelf: 'center',
                    marginBottom: 16,
                  }}
                />
              )}
            </BorderlessButton>
          ) : (
            <BorderlessButton onPress={handlePickImage}>
              <View style={styles.containerImgNamePicture}>
                {userData && userData.username !== undefined && (
                  <>
                    <Text style={styles.containerImgLetter}>
                      {userData.username.split(' ')[0][0] &&
                        userData.username.split(' ')[0][0]}
                    </Text>
                    <Text style={styles.containerImgLetter}>
                      {userData.username.split(' ')[1][0] &&
                        userData.username.split(' ')[1][0]}
                    </Text>
                  </>
                )}
              </View>
            </BorderlessButton>
          )}

          <View style={styles.inputContainer}>
            <TextInput
              value={nameInput}
              onChangeText={setNameInput}
              style={styles.input}
              placeholder={userData.username}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={emailInput}
              onChangeText={setEmailInput}
              style={styles.input}
              placeholder={userData.email}
            />
          </View>

          <Button
            variant="primary"
            label="Atualizar"
            onPress={handleUpdateUser}
          />

          <TouchableWithoutFeedback
            style={{ marginTop: 16 }}
            onPress={handleSignOut}
          >
            <Text>Sair</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </ScrollView>
  );
};
