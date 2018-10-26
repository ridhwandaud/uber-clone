const login = () => {
	return {
		type: 'login'
	}
}

const logout = () => {
	return {
		type: 'logout'
	}
}

export default {
	login,
	logout
}