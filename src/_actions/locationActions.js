import types from './types';

const getCurrentLocation = (successCallback) => {
	return (dispatch, getState) => {


		navigator.geolocation.getCurrentPosition((position) => {
			dispatch({
				type: types.REQUEST_CURRENT_LOCATION_SUCCESS,
				payload: position
			});

       	},
       	(error) => this.setState({ error: error.message }),
       		{ enableHighAccuracy: false, timeout: 200000, maximumAge: 10000 },
     	);
	};
};

export default {
	getCurrentLocation
}