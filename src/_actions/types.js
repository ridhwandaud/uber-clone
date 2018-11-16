const locationActionTypes = {
	REQUEST_CURRENT_LOCATION_SUCCESS: 'REQUEST_CURRENT_LOCATION_SUCCESS',
	REQUEST_SET_CURRENT_LOCATION_SUCCESS: 'REQUEST_SET_CURRENT_LOCATION_SUCCESS',
	SET_LOCATION_SUCCESS: 'SET_LOCATION_SUCCESS',
};

const AuthActionTypes =  {
	REQUEST_LOGIN_START: 'REQUEST_LOGIN_START',
	REQUEST_LOGIN_SUCCESS: 'REQUEST_LOGIN_SUCCESS',
	REQUEST_LOGIN_FAILED: 'REQUEST_LOGIN_FAILED',
	REQUEST_SIGNUP_START: 'REQUEST_SIGNUP_START',
	REQUEST_SIGNUP_SUCCESS: 'REQUEST_SIGNUP_SUCCESS',
	REQUEST_SIGNUP_FAILED: 'REQUEST_SIGNUP_FAILED',
	REQUEST_LOGOUT_SUCCESS: 'REQUEST_LOGOUT_SUCCESS',
};

export default {
	...locationActionTypes,
	...AuthActionTypes,
};
