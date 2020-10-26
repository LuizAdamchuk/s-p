import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Profile } from '../screens/Profile';
import { Home } from '../screens/Home';

export const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/profile" component={Profile} />
    </Switch>
  );
};
