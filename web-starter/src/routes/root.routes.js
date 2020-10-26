import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ForgotPassword } from '../screens/ForgotPassword';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';

export const RootRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
    </Switch>
  );
};
