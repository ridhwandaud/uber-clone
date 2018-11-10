import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscriber = null;
    this.state = { isLoggedIn: false };
  }

  componentDidMount(){
    const { LoginReducer } = this.props;

    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {

      if (user) {
        console.log('user already isLoggedIn');
        this.props.navigation.navigate('App');
      } else {
        console.log('user not loggedIn');
        this.props.navigation.navigate('Auth');
      }
    });

    
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapStateToProps = ({ LoginReducer }) => ({
  LoginReducer,
});

export default connect(mapStateToProps, null)(AuthLoadingScreen);