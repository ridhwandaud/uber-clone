import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const { LoginReducer } = this.props;

    loggedIn = LoginReducer.isLoggedIn;

    this.props.navigation.navigate(loggedIn ? 'App' : 'Auth');
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