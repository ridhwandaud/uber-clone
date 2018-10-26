import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import loginActions from 'actions/loginActions';
import { bindActionCreators } from 'redux';

class HomeScreen extends Component {

	logout = () => {
		const { loginActionsCreator, navigation } = this.props;
		loginActionsCreator.logout()

		this.props.navigation.navigate('Auth');
	}

	render(){
		const { LoginReducer, loginActionsCreator } = this.props;
		console.log('LoginReducer', LoginReducer);
		return(
			<View>
				<Text>
					HomeScreen
				</Text>	
				<TouchableOpacity
					onPress={() => this.logout()}
				>
					<Text>
						Logout
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
		