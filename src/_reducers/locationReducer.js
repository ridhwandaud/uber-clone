import types from 'actions/types';

const INITIAL_STATE = { 
	currentLocation: null,
	pickupPoint: 'Enter a pick-up point',
	dropOffPoint: 'Where to ?',
};

export default (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {	
		case types.REQUEST_CURRENT_LOCATION_SUCCESS:
			return {
				...state,
				currentLocation: payload.coords,
			};
		case types.REQUEST_SET_CURRENT_LOCATION_SUCCESS:
			return {
				...state,
				pickupPoint: payload[0].streetName,
			};
		case types.SET_LOCATION_SUCCESS:
			return {
				...state,
				dropOffPoint: payload.name,
			}	
		default:
		  return state;
	}
}