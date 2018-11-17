import React from 'react';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import LoginScreen from 'containers/loginScreen';
import SignupScreen from 'containers/signupScreen';
import AuthLoadingScreen from 'containers/loginScreen/auth';
import HomeScreen from 'containers/homeScreen';
import OtherScreen from 'containers/homeScreen/other';
import DestinationScreen from 'containers/destinationScreen';
import ProfileScreen from 'containers/profileScreen';
import PickupScreen from 'containers/pickupScreen';

const AuthStack = createStackNavigator({ Login: LoginScreen, Signup: SignupScreen });

const HomeStack = createStackNavigator({ Home: HomeScreen, Destination: DestinationScreen, Pickup: PickupScreen });

const ProfileStack = createStackNavigator({ Profile: ProfileScreen });


const AppStack = createDrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  Profile: {
    screen: ProfileStack,
  },
});


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