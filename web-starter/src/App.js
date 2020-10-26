import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './styles/global.css';
import { Routes } from './routes';
import { AppContextProvider } from '../src/hooks';

export const App = () => {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Routes />
      </AppContextProvider>
    </BrowserRouter>
  );
};
