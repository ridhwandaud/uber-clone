'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  StatusBar
} from 'react-native';
import MapView, { PROVIDER_GOOGLE }  from 'react-native-maps';

class Home extends Component {
  render() {
    return (
	      	<View style={{ flex: 1 }}>
	          	<StatusBar
	            	barStyle="light-content"
	            	backgroundColor="#2b2b2b"
	          	/>
	      		 	<MapView
	      		 		provider={PROVIDER_GOOGLE}
	      		 		style={styles.map}
		            	initialRegion={{
		              		latitude: 37.78825,
		              		longitude: -122.4324,
		              		latitudeDelta: 0.0922,
		              		longitudeDelta: 0.0421,
		            	}}
	          		/>
	      	</View>
    	);
  	}
}

const styles = StyleSheet.create({
	map: {
   		...StyleSheet.absoluteFillObject,
  	},
});

		
export default Home;