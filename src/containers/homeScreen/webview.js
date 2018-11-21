import React, { Component } from 'react';
import { View, Text, WebView } from 'react-native';

class TrackerView extends Component {
	static navigationOptions = {
		header: null,
	};
	
	render(){
		return(
			<WebView
		        source={{uri: 'http://ridhwandaud.com/tracker'}}
		    />
		)
	}
}

export default TrackerView;
		