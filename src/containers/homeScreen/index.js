import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import loginActions from 'actions/loginActions';
import locationActions from 'actions/locationActions';
import { bindActionCreators } from 'redux';
import MapView, { Marker, PROVIDER_GOOGLE }  from 'react-native-maps';

const { width } = Dimensions.get('window');

class HomeScreen extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
          	pickUpName: 'Enter a pick-up point',
  		}
  	}

  	static navigationOptions = {
		title: 'Ridex',
	};

	logout = () => {
		const { loginActions, navigation } = this.props;
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
			<View style={styles.container}>
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
	          			<Marker
					      	coordinate={LocationReducer.currentLocation}
					      	title="Current Location"
					    />
	          		</MapView>
				}
				
          		<View>
	  				<TouchableOpacity
	  					activeOpacity={0.85}
	  					style={styles.buttonPickup}
	  					onPress={() => this.openSearchPickupModal()}
	  				>
	  					<Text
	  						style={styles.buttonText}
	  					>
	  						{LocationReducer.pickupPoint}
	  					</Text>
	  				</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.85}
	  					style={styles.buttonDropoff}
	  					onPress={() => this.openSearchDropOffModal()}
	  				>
	  					<Text
	  						style={styles.buttonText}
	  					>
	  						{LocationReducer.dropOffPoint}
	  					</Text>
	  				</TouchableOpacity>
  				</View>
  				<TouchableOpacity
  	  					activeOpacity={0.85}
  	  					onPress={()=> console.log('unlock')}
  	  					style={styles.buttonBook}
  	  					onPress={() => this.openLocationScreen()}
  	  				>
  	  					<Text
  	  						style={styles.buttonBottomText}
  	  					>
  	  						Choose your destination
  	  					</Text>
	  				 </TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
    	...StyleSheet.absoluteFillObject,
    	justifyContent: 'space-between',
  	},
	map: {
   		...StyleSheet.absoluteFillObject,
  	},
  	buttonPickup: {
	  	backgroundColor: 'white',
	  	width: width - 40,
	  	padding: 15,
	  	marginTop: 85,
	  	marginHorizontal: 20,
	  	elevation: 2,
	  	borderRadius: 2,
	  	borderBottomRightRadius: 0,
	  	borderBottomLeftRadius: 0,
  	},
  	buttonDropoff: {
	  	marginTop: 10,
	  	backgroundColor: 'white',
	  	width: width - 40,
	  	padding: 15,
	  	marginHorizontal: 20,
	  	elevation: 2,
	  	borderRadius: 2,
	  	borderTopRightRadius: 0,
	  	borderTopLeftRadius: 0,
  	},
  	buttonText: {
  		color: 'grey',
  		fontFamily: 'System',
  	},
  	buttonBook:{
	    backgroundColor: '#3277D8',
	    alignSelf: 'flex-end',
	    width: width,
	    padding: 15,
	    elevation: 2,
	    marginTop: 10,
  	},
  	buttonBottomText: {
	    fontFamily: 'System',
	  	color: 'white',
	  	textAlign: 'center',
	    fontSize: 18,
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
		