import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import loginActions from 'actions/loginActions';
import locationActions from 'actions/locationActions';
import { bindActionCreators } from 'redux';
import MapView, { Marker, PROVIDER_GOOGLE }  from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCQoJg9aiTcFCVk32s1Yh7Xn4Nqelu_XeY';

const { width, height } = Dimensions.get('window');

class HomeScreen extends Component {

	static navigationOptions = ({navigation}) => ({
	    title: 'Home',
	    headerLeft: (
	    	<TouchableOpacity style={{ marginLeft: 10 }} onPress={()=> navigation.toggleDrawer()}>
	      		<Icon name="bars" size={20} color="black" />
	      	</TouchableOpacity>
	    ),
	});

	constructor(props) {
    	super(props);
    	this.state = {
          	pickUpName: 'Enter a pick-up point',
  		}
  	}

	logout = () => {
		const { loginActions, navigation } = this.props;
		loginActions.logout()

		this.props.navigation.navigate('Auth');
	}

	componentDidMount(){
		const { locationActions } = this.props;

		locationActions.getCurrentLocation();
	}

	choosePickupPoint = () => {
		const { navigation } = this.props;

		navigation.navigate('Pickup');
	}

	chooseDropOffPoint = () => {
		const { navigation } = this.props;

		navigation.navigate('Destination');
	}

	render(){
		const { LocationReducer, loginActionsCreator } = this.props;
		console.log('LocationReducer', LocationReducer);
		return(
			<View style={styles.container}>
				{
					LocationReducer.region &&

					<MapView
	      		 		provider={PROVIDER_GOOGLE}
	      		 		style={styles.map}
	      		 		region={LocationReducer.region}
	      		 		ref={c => this.mapView = c}
		            	// initialRegion={{
		             //  		latitude: LocationReducer.currentLocation.latitude,
		             //  		longitude: LocationReducer.currentLocation.longitude,
		             //  		latitudeDelta: 0.0082,
		             //  		longitudeDelta: 0.0081,
		            	// }}
	          		>
	          			<Marker
					      	coordinate={LocationReducer.currentLocation}
					      	title="Pickup"
					    />
					    
						{
							LocationReducer.dropOffLatLong &&
							<Marker
					      		coordinate={LocationReducer.dropOffLatLong}
					      		title="Destination"
					    	/>
						}
						{
					    	LocationReducer.dropOffLatLong &&
					    	<MapViewDirections
					    		origin={LocationReducer.currentLocation}
							    destination={LocationReducer.dropOffLatLong}
							    apikey={GOOGLE_MAPS_APIKEY}
							    strokeWidth={3}
    							strokeColor="#3277D8"
    							onReady={(result) => {
					              this.mapView.fitToCoordinates(result.coordinates, {
					                edgePadding: {
					                  right: (width / 20),
					                  bottom: (height / 20),
					                  left: (width / 20),
					                  top: (height / 20),
					                }
					              });
					            }}
						  	/>
						}
	          		</MapView>
				}
				
          		<View>
	  				<TouchableOpacity
	  					activeOpacity={0.85}
	  					style={styles.buttonPickup}
	  					onPress={() => this.choosePickupPoint()}
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
	  					onPress={() => this.chooseDropOffPoint()}
	  				>
	  					<Text
	  						style={styles.buttonText}
	  					>
	  						{LocationReducer.dropOffPoint}
	  					</Text>
	  				</TouchableOpacity>
  				</View>
  				{
					LocationReducer.dropOffLatLong ?

					<TouchableOpacity
	  					activeOpacity={0.85}
	  					onPress={()=> console.log('unlock')}
	  					style={styles.buttonBook}
	  					onPress={() => this.chooseDropOffPoint()}
	  				>
	  					<Text
	  						style={styles.buttonBottomText}
	  					>
	  						Confirm pickup
	  					</Text>
	  				</TouchableOpacity>

					:

	  				<TouchableOpacity
	  					activeOpacity={0.85}
	  					onPress={()=> console.log('unlock')}
	  					style={styles.buttonBook}
	  					onPress={() => this.chooseDropOffPoint()}
	  				>
	  					<Text
	  						style={styles.buttonBottomText}
	  					>
	  						Choose your destination
	  					</Text>
	  				</TouchableOpacity>
  				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
    	...StyleSheet.absoluteFillObject,
    	justifyContent: 'space-between',
    	...Platform.select({
	      ios: {
	        marginTop: 60,
	      },
	      android: {
	        marginTop: 0,
	      },
	    }),
  	},
	map: {
   		...StyleSheet.absoluteFillObject,
  	},
  	buttonPickup: {
	  	backgroundColor: 'white',
	  	width: width - 40,
	  	padding: 15,
	  	marginTop: 20,
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
		
