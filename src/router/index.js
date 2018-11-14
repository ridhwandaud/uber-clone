import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import LoginScreen from 'containers/loginScreen';
import SignupScreen from 'containers/signupScreen';
import AuthLoadingScreen from 'containers/loginScreen/auth';
import HomeScreen from 'containers/homeScreen';
import OtherScreen from 'containers/homeScreen/other';
import LocationScreen from 'containers/locationScreen';

const AuthStack = createStackNavigator({ Login: LoginScreen, Signup: SignupScreen });

const AppStack = createStackNavigator({ Home: HomeScreen, Location: LocationScreen });


export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);