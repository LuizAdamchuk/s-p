import Constants from 'expo-constants';
import { Notifications } from 'expo';
import { AsyncStorage, Alert } from 'react-native';
import { form, post, put, jsonParser } from './Client';
import { TOKEN_KEY, EMAIL_KEY } from '../constants/Keys';

// ESSE ARQUIVO AGORA ESTA INTEIRAMENTE EM HOOKS AUTHCONTEXT

const getDeviceToken = async () =>
  Constants.isDevice ? await Notifications.getExpoPushTokenAsync() : 'debug';

const login = async (email, password) => {
  // let deviceToken = await getDeviceToken();
  return form('/authenticate', {
    body: { email, password },
    credentials: 'none',
  })
    .then(res => {
      if (res.status === 403 || res.status === 401) {
        AsyncStorage.removeItem(TOKEN_KEY);
        return Promise.reject('Email ou senha inválidos.');
      } else {
        return res.json();
      }
    })
    .then(data => {
      AsyncStorage.setItem(TOKEN_KEY, data.token);
      AsyncStorage.setItem(EMAIL_KEY, email);
      return data;
    })
    .catch(err => console.log(err));
};

const register = user =>
  post('/register', { body: user })
    .then(jsonParser)
    .then(() => {
      AsyncStorage.setItem(EMAIL_KEY, user.email);
    });

const save = user => put(`/users/${user.id}`, { body: user });

export { login, register, save };
