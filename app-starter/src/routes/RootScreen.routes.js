import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { SingIn } from '../screens/SingIn';
import { SignUp } from '../screens/SignUp';
import { ForgotPassword } from '../screens/ForgotPassword';

const RootStack = createStackNavigator();

export const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SignIn" component={SingIn} />
    <RootStack.Screen name="SignUp" component={SignUp} />
    <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
  </RootStack.Navigator>
);
