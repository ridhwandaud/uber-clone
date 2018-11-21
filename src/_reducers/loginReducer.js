import types from 'actions/types';

const INITIAL_STATE = { 
	user: null,
	isLoggedIn: false,
	isLoading: false,
};


export default (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {	
		case types.REQUEST_LOGIN_START:
			return {
				...state,
				isLoading: true,
			};
		case types.REQUEST_LOGIN_SUCCESS:
			return {
				...state,
				user: payload,
				isLoggedIn: true,
				isLoading: false,
			};	
		case types.REQUEST_LOGIN_FAILED:
			return {
				...state,
				isLoading: false,
			};
		case types.REQUEST_SIGNUP_START:
			return {
				...state,
				isLoading: true,
			};
		case types.REQUEST_SIGNUP_SUCCESS:
			return {
				...state,
				user: payload,
				isLoggedIn: true,
				isLoading: false,
			};	
		case types.REQUEST_SIGNUP_FAILED:
			return {
				...state,
				isLoading: false,
			};			
		case types.REQUEST_LOGOUT_SUCCESS:
			console.log('logout');
			return {
				...state,
				isLoggedIn: false,
			};		
		default:
		  return state;
	}
}