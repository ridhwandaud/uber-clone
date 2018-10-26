import React, { Component } from 'react';
import {  Platform, StyleSheet, Text, View } from 'react-native';
import Router from 'router';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { persistor, store } from 'store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
