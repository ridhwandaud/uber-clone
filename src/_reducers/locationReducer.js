import types from 'actions/types';

const INITIAL_STATE = { 
	currentLocation: null,
	pickupPoint: null,
	dropOffPoint: null,
};

export default (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {	
		case types.REQUEST_CURRENT_LOCATION_SUCCESS:
			return {
				...state,
				currentLocation: payload.coords,
			};	
		default:
		  return state;
	}
}