import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import loginActions from 'actions/loginActions';
import { bindActionCreators } from 'redux';
import MapView, { PROVIDER_GOOGLE }  from 'react-native-maps';


class HomeScreen extends Component {

	logout = () => {
		const { loginActionsCreator, navigation } = this.props;
		loginActions.logout()

		this.props.navigation.navigate('Auth');
	}

	componentDidMount(){
		const { locationActions } = this.props;

		locationActions.getCurrentLocation();
	}

	render(){
		const { LoginReducer, loginActionsCreator } = this.props;
		console.log('LoginReducer', LoginReducer);
		return(
			<View style={{ flex: 1 }}>
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
          		<TouchableOpacity
					onPress={() => this.logout()}
				>
					<Text>
						Logout
					</Text>	
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	map: {
   		...StyleSheet.absoluteFillObject,
  	},
});

const mapStateToProps = ({ LoginReducer }) => ({
	LoginReducer,
});

const mapDispatchToProps = (dispatch) => {
	return {
		loginActions: bindActionCreators(loginActions, dispatch),
		locationActions: bindActionCreators(locationActions, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
		