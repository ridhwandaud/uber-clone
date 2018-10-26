import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import loginActions from 'actions/loginActions';
import { bindActionCreators } from 'redux';

class OtherScreen extends Component {
	render(){
		const { LoginReducer, loginActionsCreator } = this.props;
		return(
			<View>
				<Text>
					OtherScreen
				</Text>	
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

export default connect(mapStateToProps, mapDispatchToProps)(OtherScreen);
		