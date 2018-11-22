import types from './types';
import firebase from 'react-native-firebase';
import Geocoder from 'react-native-geocoder-reborn';
import { regionFrom } from 'config/helpers';

const getCurrentLocation = (successCallback) => {

	let user = firebase.auth().currentUser;

	console.log('currentUser',user);

	return (dispatch, getState) => {

		console.log('getCurrentLocation');
		
		navigator.geolocation.watchPosition((position) => {
			dispatch({
				type: types.REQUEST_CURRENT_LOCATION_SUCCESS,
				payload: position
			});

			let location = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			//set region
			var region = regionFrom(
	            position.coords.latitude, 
	            position.coords.longitude, 
	            position.coords.accuracy
	        );

	        dispatch({
				type: types.SET_CURRENT_REGION_SUCCESS,
				payload: region
			});

			Geocoder.geocodePosition(location).then(res => {
			    // res is an Array of geocoding object (see below)
			    console.log('res', res);
			    dispatch({
					type: types.REQUEST_SET_CURRENT_LOCATION_SUCCESS,
					payload: res,
				});
			})
			.catch(err => console.log(err))

			const ref = firebase.database().ref('users/' + user._user.uid);

			ref.update({ location: position.coords });
       	},
       	(error) => this.setState({ error: error.message }),
       		{ 
       			enableHighAccuracy: true, 
       			timeout: 200000, 
       			maximumAge: 10000,
       			distanceFilter: 100,
       		},
     	);
	};
};

const setLocation = (location, successCallback) => {
	return (dispatch, getState) => {
		dispatch({
			type: types.SET_LOCATION_SUCCESS,
			payload: location
		});

		//set region
		var region = regionFrom(
            location.geometry.location.lat, 
            location.geometry.location.lng,
            10
        );

        console.log('region', region);

        dispatch({
			type: types.SET_CURRENT_REGION_SUCCESS,
			payload: region
		});

		successCallback && successCallback();
	}
};

const setPickup = (location, successCallback) => {
	return (dispatch, getState) => {
		dispatch({
			type: types.SET_PICKUP_LOCATION_SUCCESS,
			payload: location
		});

		//set region
		var region = regionFrom(
            location.geometry.location.lat, 
            location.geometry.location.lng,
            10
        );

        console.log('region', region);

        dispatch({
			type: types.SET_CURRENT_REGION_SUCCESS,
			payload: region
		});

		successCallback && successCallback();
	}
}

export default {
	getCurrentLocation,
	setLocation,
	setPickup
}
