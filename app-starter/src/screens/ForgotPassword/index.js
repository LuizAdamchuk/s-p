import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useFormik } from 'formik';

import { validateEmail } from '../../utils/Validation';
import Colors from '../../constants/Colors';
import { styles } from './style';

const { height, width } = Dimensions.get('window');

export const ForgotPassword = () => {
  const navigation = useNavigation();
  const [emailValidation, setEmailValidation] = useState(true);

  const formik = useFormik({
    initialValues: {
      user: {
        email: '',
      },
    },
  });

  const handleSendEmail = useCallback(async () => {
    setEmailValidation(true);

    if (formik.values.email === undefined) {
      setEmailValidation(false);
      return Alert.alert('Campo obrigatório.');
    }
    if (validateEmail(formik.values.email.trim()) === false) {
      setEmailValidation(false);
      return Alert.alert('E-mail inválido.');
    }
    navigation.navigate('SignIn');

    //SETTING - Sendgrid for send emails

    // await strapi.plugins['email'].services.email.send({
    //   to: 'paulbocuse@strapi.io',
    //   from: 'joelrobuchon@strapi.io',
    //   cc: 'helenedarroze@strapi.io',
    //   bcc: 'ghislainearabian@strapi.io',
    //   replyTo: 'annesophiepic@strapi.io',
    //   subject: 'Use strapi email provider successfully',
    //   text: 'Hello world!',
    //   html: 'Hello world!',
    // });
  }, [formik]);

  return (
    <ScrollView>
      <Animatable.View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{ alignItems: 'center', flexDirection: 'row' }}
            onPress={() => navigation.goBack()}
          >
            <Feather name="chevron-left" size={32} color={Colors.black} />
            <Text style={styles.textHeader}>Voltar</Text>
          </TouchableOpacity>
          <View />
          <View />
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? -(height * 0.25) : -height
          }
        >
          <Animatable.View animation="fadeInUp" style={styles.content}>
            <Text style={styles.textContent}>Esqueci minha senha</Text>
            <Text style={styles.textDescription}>
              Informe seu e-mail e nós enviaremos um link para gerar uma senha
              nova.{' '}
            </Text>
            <View style={styles.footer}>
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
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  placeholder="E-mail"
                  style={styles.textInput}
                  onChangeText={formik.handleChange('email')}
                  value={formik.values.email}
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.buttonSendEmail}
                  onPress={handleSendEmail}
                >
                  <Text style={styles.textButtonSendEmail}>Enviar</Text>
                  <Feather name="send" color="#fff" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ padding: 96 }} />
          </Animatable.View>
        </KeyboardAvoidingView>
      </Animatable.View>
    </ScrollView>
  );
};
