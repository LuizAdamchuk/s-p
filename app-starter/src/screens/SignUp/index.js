import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { mask as masker, unMask } from 'remask';
import { Feather, AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useFormik } from 'formik';

import { styles } from './style';
import logo from '../../assets/logo.png';
import Colors from '../../constants/Colors';
import { useAuth } from '../../hooks/authContext';
import { validateEmail } from '../../utils/Validation';

const { height } = Dimensions.get('window');

export const SignUp = () => {
  const { signUp } = useAuth();
  const navigation = useNavigation();

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [nameValidation, setNameValidation] = useState(true);
  const [emailValidation, setEmailValidation] = useState(true);

  const [passwordEquals, setPasswordEquals] = useState(true);
  const [
    secureTextEntryConfirmation,
    setSecureTextEntryConfirmation,
  ] = useState(true);

  const [loading, setLoading] = useState(true);
  const [statesData, setStatesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [selectedState, setSelectedState] = useState(0);
  const [selectedCity, setSelectedCity] = useState(0);
  const [maskCpfValue, setMaskCpfValue] = useState('');
  const formik = useFormik({
    initialValues: {
      user: {
        name: '',
        email: '',
        cpf: '',
        birthday: '',
        phone: '',
        address: '',
        password: '',
        state: 0,
        city: 0,
      },

      passwordConfirmation: '',
      states: '',
      cities: '',
      terms: false,
    },
  });

  const placeholderState = {
    label: 'Estado',
    value: null,
  };
  const placeholderCities = {
    label: 'Cidades',
    value: null,
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  const handleMaskCpfValue = useCallback(ev => {
    const originalValue = unMask(ev.nativeEvent.text);
    const maskedValue = masker(originalValue, ['999.999.999-99']);
    setMaskCpfValue(maskedValue);
  }, []);

  const handleSecureTextEntry = useCallback(() => {
    setSecureTextEntry(!secureTextEntry);
  }, [secureTextEntry]);

  const handleSecureTextEntryConfirmation = useCallback(() => {
    setSecureTextEntryConfirmation(!secureTextEntryConfirmation);
  }, [secureTextEntryConfirmation]);

  const handleSubmit = useCallback(async () => {
    setNameValidation(true);
    setEmailValidation(true);

    if (
      formik.values.name === undefined ||
      formik.values.password === undefined ||
      formik.values.email === undefined
    ) {
      return Alert.alert('Preencha todos os campos!');
    }

    const userData = {
      username: formik.values.name.trim(),
      email: formik.values.email.trim(),
      password: formik.values.password.trim(),
    };

    if (userData.password.length >= 6) {
      if (userData.password === formik.values.passwordConfirmation) {
        setPasswordEquals(true);
      } else {
        setPasswordEquals(false);

        return Alert.alert('Por favor, confira a senha.');
      }
    } else {
      setPasswordEquals(false);
      return Alert.alert('A senha deve ter mais de 6 dígitos. ');
    }

    if (userData.username.length <= 12) {
      setNameValidation(false);
      return Alert.alert('Insira seu nome completo');
    }
    if (validateEmail(userData.email) === false) {
      setEmailValidation(false);
      return Alert.alert('E-mail inválido.');
    }

    const res = await signUp(userData);

    if (res.status === 200) {
      return navigation.navigate('SignIn');
    } else {
      return Alert.alert(
        'Algo deu errado',
        'Confira os valores e tente novamente',
      );
    }
  }, [formik]);

  if (loading) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => navigation.goBack()}
          >
            <Feather name="chevron-left" size={32} color={Colors.black} />
            <Text style={styles.textHeader}>Voltar</Text>
          </TouchableOpacity>

          <View style={{ alignSelf: 'center', paddingVertical: 24 }}>
            <Image
              style={styles.headerImg}
              resizeMode="contain"
              source={logo}
            />
            <Text style={styles.textTitleHeader}>Cadastrar</Text>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? -(height * 0.15) : -height
          }
        >
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <View style={styles.containerSeparatorStyle}>
              <View style={styles.separatorStyle} />
            </View>

            <View
              style={
                nameValidation
                  ? styles.inputContainer
                  : styles.inputContainerWrong
              }
            >
              <Feather
                name="user"
                size={20}
                color={nameValidation ? '#666' : '#F85568'}
              />
              <TextInput
                name="name"
                autoCapitalize="words"
                keyboardAppearance="dark"
                textContentType="name"
                keyboardType="default"
                placeholder="Nome Completo"
                style={styles.textInput}
                onChangeText={formik.handleChange('name')}
                value={formik.values.name}
              />
            </View>

            <View
              style={
                emailValidation
                  ? styles.inputContainer
                  : styles.inputContainerWrong
              }
            >
              <Feather
                name="mail"
                size={20}
                color={emailValidation ? '#666' : '#F85568'}
              />
              <TextInput
                name="email"
                autoCapitalize="none"
                textContentType="emailAddress"
                keyboardType="email-address"
                keyboardAppearance="dark"
                placeholder="E-mail"
                style={styles.textInput}
                onChangeText={formik.handleChange('email')}
                value={formik.values.email}
              />
            </View>

            <View
              style={
                passwordEquals
                  ? styles.inputContainer
                  : styles.inputContainerWrong
              }
            >
              <Feather
                name="lock"
                size={20}
                color={passwordEquals ? '#666' : '#F85568'}
              />
              <TextInput
                name="password"
                secureTextEntry={secureTextEntry}
                keyboardAppearance="dark"
                textContentType="password"
                keyboardType="default"
                placeholder="Insira sua senha"
                style={styles.textInput}
                onChangeText={formik.handleChange('password')}
                value={formik.values.password}
              />
              <TouchableOpacity onPress={handleSecureTextEntry}>
                <Feather
                  name={secureTextEntry ? 'eye-off' : 'eye'}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
            <View
              style={
                passwordEquals
                  ? styles.inputContainer
                  : styles.inputContainerWrong
              }
            >
              <Feather
                name="lock"
                size={20}
                color={passwordEquals ? '#666' : '#F85568'}
              />
              <TextInput
                name="passwordConfirmation"
                secureTextEntry={secureTextEntryConfirmation}
                keyboardAppearance="dark"
                textContentType="password"
                keyboardType="default"
                placeholder="Confirme a senha"
                style={styles.textInput}
                onChangeText={formik.handleChange('passwordConfirmation')}
                value={formik.values.passwordConfirmation}
              />
              <TouchableOpacity onPress={handleSecureTextEntryConfirmation}>
                <Feather
                  name={secureTextEntryConfirmation ? 'eye-off' : 'eye'}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonSignUp}
                onPress={handleSubmit}
              >
                <Text style={styles.textButtonSignUp}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};
