'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  SafeAreaView
} from 'react-native';

class Login extends Component {
  render() {
    return (
      	<SafeAreaView style={{ flex: 1 }}>
      		<Text
            onPress={() => this.props.navigation.navigate('App')}
          >
      			Login
      		</Text>
      	</SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

});

		
export default Login;