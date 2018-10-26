import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import loginActions from 'actions/loginActions';
import { bindActionCreators } from 'redux';

class LoginScreen extends Component {

	login = () => {
		const { loginActionsCreator } = this.props;
		
		loginActionsCreator.login();

		this.props.navigation.navigate('App');

		console.log('login');
	}

	render(){
		const { LoginReducer, loginActionsCreator } = this.props;
		console.log('LoginReducer', LoginReducer);
		return(
			<View>
				<TouchableOpacity
					onPress={() => this.login()}
				>
					<Text>
						Login
					</Text>	
				</TouchableOpacity>
			</View>
		)
	}
}

const mapStateToProps = ({ LoginReducer }) => ({
	LoginReducer,
});

const mapDispatchToProps = (dispatch) => {
	return {
		loginActionsCreator: bindActionCreators(loginActions, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
		