import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';

import { api } from '../services/api';
import { EMAIL_KEY, TOKEN_KEY } from '../constants/Keys';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [validate, setValidate] = useState(false);

  useEffect(() => {
    async function loadStoragedDate() {
      const [token, user] = await AsyncStorage.multiGet([TOKEN_KEY, EMAIL_KEY]);

      if (token[1] !== null && user[1] !== null) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ token: token[1], user: JSON.parse(user[1]) });
        setValidate(true);
        setIsLoading(false);
        console.log(data.token);

        return;
      }
      setData({});
      setIsLoading(false);
      setValidate(false);
    }
    loadStoragedDate();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post('auth/local', {
        identifier: email,
        password,
      });

      const { jwt, user } = response.data;
      console.log(jwt);

      await AsyncStorage.multiSet([
        [TOKEN_KEY, jwt],
        [EMAIL_KEY, JSON.stringify(user.email)],
      ]),
        (api.defaults.headers.authorization = `Bearer ${jwt}`);
      setValidate(true);

      return setData({ jwt, user });
    } catch (error) {
      return { status: 400 };
    }
  }, []);

  const signUp = useCallback(async user => {
    try {
      const res = await api.post('auth/local/register', user);
      return res;
    } catch (error) {
      return error;
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([TOKEN_KEY, EMAIL_KEY]);
    api.defaults.headers.authorization = ``;

    setValidate(false);

    return setData({});
  }, []);

  return (
    <AuthContext.Provider
      value={{ data, isLoading, validate, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used with an AuthProvider');
  }
  return context;
}
