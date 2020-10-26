import React from 'react';

import { RootRoutes } from './root.routes';
import { AppRoutes } from './app.routes';
import { useAuth } from '../hooks/AuthContext';

export const Routes = () => {
  const { isLoading, validate } = useAuth();

  if (isLoading) {
    return <div>Carregando..</div>;
  }
  return validate ? <AppRoutes /> : <RootRoutes />;
};
