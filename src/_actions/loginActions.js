import types from './types';
import firebase from 'react-native-firebase';

const requestLoginStart = () => ({ type: types.REQUEST_LOGIN_START });
const requestLoginSuccess = (payload) => ({ type: types.REQUEST_LOGIN_SUCCESS, payload });
const requestLoginFailed = () => ({ type: types.REQUEST_LOGIN_FAILED});

const requestLogin = (email, password, successCallback, callbackError) => {
	return (dispatch, getState) => {

		dispatch(requestLoginStart());

		console.log('email: ' + email + ' password: ' + password);

		firebase.auth().signInWithEmailAndPassword(email, password)
		.then((data)=>{
			dispatch(requestLoginSuccess(data));
			successCallback && successCallback();
		})
		.catch((error) => {
			dispatch(requestLoginFailed());
			console.log('error', error);
			callbackError && callbackError(error);
		})
	};
};

const requestSignupStart = () => ({ type: types.REQUEST_SIGNUP_START });
const requestSignupSuccess = (payload) => ({ type: types.REQUEST_SIGNUP_SUCCESS, payload });
const requestSignupFailed = () => ({ type: types.REQUEST_SIGNUP_FAILED});

const requestSignup = (email, password, name, mobile, successCallback, callbackError) => {
	return (dispatch, getState) => {

		dispatch(requestSignupStart());

		console.log('email: ' + email + ' password: ' + password);

		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((data)=>{
			dispatch(requestSignupSuccess(data));
			successCallback && successCallback();
		})
		.catch((error) => {
			dispatch(requestSignupFailed());
			console.log('error', error);
			callbackError && callbackError(error);
		})
	};
};


const logout = () => {
	firebase.auth().signOut();
	return {
		type: 'logout'
	}
}

export default {
	requestLogin,
	requestSignup,
	logout
}