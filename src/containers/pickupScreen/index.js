import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import locationActions from 'actions/locationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class PickupScreen extends Component {

	selectPickup = (details) => {
		const { navigation, locationActions } = this.props;

		locationActions.setPickup(details, () => {
			navigation.navigate('Home');
		});
	}
	render(){
		return(
			<View style={styles.container}>
				<GooglePlacesAutocomplete
					placeholder='Pickup point'
					minLength={2}
					autoFocus={true}
					returnKeyType={'default'}
					fetchDetails={true}
					onPress={(data, details = null) => this.selectPickup(details)}
					query={{
				        // available options: https://developers.google.com/places/web-service/autocomplete
				        key: 'AIzaSyCQoJg9aiTcFCVk32s1Yh7Xn4Nqelu_XeY',
				        language: 'en', // language of the results
				        //types: '(cities)', // default: 'geocode'
				        components: 'country:my'
				    }}
				    styles={{
						textInputContainer: {
						  backgroundColor: 'white',
						  borderTopWidth: 0,
						  borderBottomWidth:1,
						  borderColor: '#cfcfcf',
						  height: 52,
						},
						textInput: {
							paddingTop: 0,
							marginTop: 7,
							marginLeft: 0,
      						marginRight: 0,
							height: 40,
							color: '#5d5d5d',
							fontSize: 14,
							fontFamily: 'System',
						},
						predefinedPlacesDescription: {
						  color: '#1faadb'
						},
					}}
					currentLocation={false}
				>
				</GooglePlacesAutocomplete>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

const mapDispatchToProps = (dispatch) => {
	return {
		locationActions: bindActionCreators(locationActions, dispatch),
	};
};

export default connect(null, mapDispatchToProps)(PickupScreen);
		