const INITIAL_STATE = { 
	user: null,
	isLoggedIn: false,
};

export default (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {	
		case 'login':
			return {
				...state,
				isLoggedIn: true,
			};
		case 'logout':
			return {
				...state,
				isLoggedIn: false,
			};		
		default:
		  return state;
	}
}