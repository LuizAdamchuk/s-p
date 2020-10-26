import React, { createContext, useCallback, useState, useContext } from 'react';

import { api } from '../services/api';
import { EMAIL_KEY, TOKEN_KEY } from '../constants/Keys';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [validate, setValidate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = localStorage.getItem(EMAIL_KEY);

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      setValidate(true);

      return { token, user: JSON.parse(user) };
    }

    return {};
  });

  const signIn = useCallback(async ({ email, password }) => {
    setIsLoading(true);
    const response = await api.post('auth/local', {
      identifier: email,
      password,
    });

    const { jwt, user } = response.data;

    localStorage.setItem(TOKEN_KEY, jwt);
    localStorage.setItem(EMAIL_KEY, JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${jwt}`;
    setValidate(true);

    setData({ jwt, user });

    setIsLoading(false);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL_KEY);
    api.defaults.headers.authorization = ``;

    setValidate(false);

    setData({});
  }, []);

  const updateUser = useCallback(
    user => {
      localStorage.setItem(EMAIL_KEY, JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );
  const signUp = useCallback(async user => {
    try {
      const res = await api.post('auth/local/register', user);
      return res;
    } catch (error) {
      return error;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        validate,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
