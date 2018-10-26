import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import LoginScreen from 'containers/loginScreen';
import AuthLoadingScreen from 'containers/loginScreen/auth';
import HomeScreen from 'containers/homeScreen';
import OtherScreen from 'containers/homeScreen/other';

const AuthStack = createStackNavigator({ Login: LoginScreen });

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });


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