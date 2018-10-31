const getCurrentLocation = (successCallback) => {
	return (dispatch, getState) => {


		navigator.geolocation.getCurrentPosition((position) => {

			console.log('position', position);

       	},
       	(error) => this.setState({ error: error.message }),
       		{ enableHighAccuracy: false, timeout: 200000, maximumAge: 10000 },
     	);
	};
};

export default {
	getCurrentLocation
}