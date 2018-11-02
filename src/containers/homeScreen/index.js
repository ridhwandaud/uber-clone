import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import loginActions from 'actions/loginActions';
import locationActions from 'actions/locationActions';
import { bindActionCreators } from 'redux';
import MapView, { Marker, PROVIDER_GOOGLE }  from 'react-native-maps';


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
		const { LocationReducer, loginActionsCreator } = this.props;
		console.log('LocationReducer', LocationReducer);
		return(
			<View style={{ flex: 1 }}>
				{
					LocationReducer.currentLocation &&

					<MapView
	      		 		provider={PROVIDER_GOOGLE}
	      		 		style={styles.map}
		            	initialRegion={{
		              		latitude: LocationReducer.currentLocation.latitude,
		              		longitude: LocationReducer.currentLocation.longitude,
		              		latitudeDelta: 0.0922,
		              		longitudeDelta: 0.0421,
		            	}}
	          		>
	          			<Marker coordinate={LocationReducer.currentLocation} />
	          		</MapView>
				}
				
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

const mapStateToProps = ({ LocationReducer }) => ({
	LocationReducer,
});

const mapDispatchToProps = (dispatch) => {
	return {
		loginActions: bindActionCreators(loginActions, dispatch),
		locationActions: bindActionCreators(locationActions, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
		