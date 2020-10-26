import React from 'react';

import { AuthProvider } from './AuthContext';
// import { ToastProvider } from './ToastContext';

export const AppContextProvider = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
